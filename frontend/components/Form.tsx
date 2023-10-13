import { Root, List, Trigger, Content } from '@radix-ui/react-tabs';
import { InputField, Select } from './Elements';
import { ChangeEvent, useEffect, useState } from 'react';
import Button from '@/ui/Button';
import ReCAPTCHA from 'react-google-recaptcha';
import { useRouter } from 'next/router';
import { useDebounce } from '@/hooks/useDebounce';
import { server } from '@/tools/routes';

interface FormProps {
  provinces: string[];
}

const Form = ({ provinces }: FormProps) => {
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [profession, setProfession] = useState<string>('');
  const [professionOptions, setProfessionOptions] = useState([]);
  const [captcha, setCaptcha] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dropdownToggle, setDropdownToggle] = useState(false);
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const debouncedValue = useDebounce(searchTerm, 500);

  useEffect(() => {
    const search = async () => {
      setIsLoading
      const url = `${server}/autocomplete?term=${debouncedValue}&province=${selectedLocation}`;
      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        setProfessionOptions(JSON.parse(await response.json()));

        setIsLoading(false);
        setDropdownToggle(true);
      } catch (error) {
        console.error('Error in fetchServerData:', error);
        throw error;
      }
    };

    if (debouncedValue) {
      search();
    }
  }, [debouncedValue]);

  const handleSubmit = (
    province: string,
    profession: string,
  ) => {
    const prepareStr = (inputString: string) => inputString.trim().toLowerCase();

    router.push(`/roadmap?province=${prepareStr(selectedLocation)}&profession=${prepareStr(profession)}`);
  };

  function handleProfessionChange(e: ChangeEvent<HTMLInputElement>) {
    setProfession(e.target.value);
    setSearchTerm(e.target.value);
  }

  const handleDropdown = (event: any) => {
    setProfession(event.target.textContent);
    setDropdownToggle(false);
  }

  const handleCaptcha: any = async (value: any) => {
    try {
      const res = await fetch('/api/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ captcha: value }),
      });

      const success = await res.json();

      if (success) {
        setCaptcha(true);
      } else {
        setCaptcha(false);
        alert('captcha failed');
      }
    } catch (err) {
      alert(`An error occurred while verifying the reCAPTCHA:\n${err}`);
    }
  };

  const triggerStyle = "bg-white flex-1 px-0 py-[10px] w-[50%] items-center text-secondary-text text-base leading-[25.28px] text-center hover:color-primary data-[state=active]:text-black data-[state=active]:shadow-inner data-[state=active]:shadow-inner data-[state=active]:font-bold"

  return (
    <Root className='flex flex-col w-[100%]' defaultValue="tab1">
      <List className='flex flex-shrink-0 border-b-[1px] border-[#D0D0D0] justify-around' aria-label="Manage your account">
        <Trigger className={triggerStyle} value="tab1">
          {/*Look for jobs*/}
          I know what job<br /> I want
        </Trigger>
        <Trigger className={triggerStyle} value="tab2">
          {/*Start a new career*/}
          I want to start a new career
        </Trigger>
      </List>
      <Content value="tab1">
        <div className='flex flex-col py-[40px] gap-[16px]'>
          <Select
            options={provinces}
            defaultValue={0}
            onChange={(event) => {
              setSelectedLocation(event.target.value);
            }} />
          <InputField onChange={handleProfessionChange} value={profession} placeholder='Job title' />
          

          {dropdownToggle &&
            <ul className='p-2 menu dropdown-content z-[1] bg-light-color rounded-box'>
              {professionOptions.length > 0 && professionOptions.map((option: string, i: number) => {
                return <li key={i} >
                  <button className='p-3 text-sm hover:bg-hover-input active:bg-light-color'
                    onClick={handleDropdown}>
                    {option}
                  </button></li>
              })}
            </ul>
          }
          <Button text="Profession Overview" intent="primary" size="small" />
          <div className='flex flex-1 items-center justify-center w-full'>
            <ReCAPTCHA className='w-full justify-center' sitekey='6LeTy1soAAAAAAHKzYpT4lqFgH_nGWfcaNg8Nukc' onChange={handleCaptcha} />
          </div>
        </div>
      </Content>
      <Content value="tab2">
        <div className='flex flex-col py-[40px] gap-[16px]'>
          <Select
            options={provinces}
            defaultValue={0}
            onChange={(event) => {
              setSelectedLocation(event.target.value);
            }} />
          <InputField onChange={handleProfessionChange} value={profession} placeholder='Your current job' />
          {dropdownToggle &&
            <ul className='p-2 menu dropdown-content z-[1] bg-light-color rounded-box'>
              {professionOptions.length > 0 && professionOptions.map((option: string, i: number) => {
                return <li key={i} >
                  <button className='p-3 text-sm hover:bg-hover-input active:bg-light-color'
                    onClick={handleDropdown}>
                    {option}
                  </button></li>
              })}
            </ul>
          }
          <Button disabled={!captcha} intent="primary" text="Explore Jobs" size="small" />
          <div className='flex flex-1 items-center justify-center w-full'>
            <ReCAPTCHA className='w-full justify-center' sitekey='6LeTy1soAAAAAAHKzYpT4lqFgH_nGWfcaNg8Nukc' onChange={handleCaptcha} />
          </div>
        </div>
      </Content>
    </Root>
  )
}

export default Form;