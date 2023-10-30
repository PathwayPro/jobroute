import { Root, List, Trigger, Content } from '@radix-ui/react-tabs';
import { InputField, Select } from './Elements';
import { ChangeEvent, useEffect, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useRouter } from 'next/router';
import { useDebounce } from '@/hooks/useDebounce';
import { server } from '@/tools/routes';
import Button from '@/ui/Button';
import { trim } from '@/utils/utils';

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
      setIsLoading(true)
      setDropdownToggle(true);
      const url = `${server}/autocomplete?term=${debouncedValue}&province=${selectedLocation}`;
      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        setProfessionOptions(JSON.parse(await response.json()));

        setIsLoading(false);
      } catch (error) {
        console.error('Error in fetchServerData:', error);
        throw error;
      }
    };

    if (debouncedValue) {
      setProfessionOptions([]);
      search();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  const handleSubmit = (
  ) => {
    if (!captcha || !profession || !selectedLocation) {
      return;
    }
    router.push(`/roadmap?province=${trim(selectedLocation)}&profession=${trim(profession)}`);
  };

  function handleProfessionChange(e: ChangeEvent<HTMLInputElement>) {
    setProfession(e.target.value);
    setSearchTerm(e.target.value);
  }

  const handleDropdown = (event: any) => {
    setProfession(event.target.textContent);
    setDropdownToggle(false);
  }

  // TODO: reset inputted data when switching between tabs

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
          I know what job<br /> I want
        </Trigger>
        <Trigger className={triggerStyle} value="tab2">
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
              <div className="relative">
                <ul className='p-2 w-[374px] shadow-outline absolute menu dropdown-content z-[99] bg-light-color rounded-box'>
                  {isLoading && <li className="flex w-full justify-center items-center">
                    <span className="loading loading-dots loading-xs"></span>
                  </li>}
                  {professionOptions.length > 0 && professionOptions.map((option: string, i: number) => {
                    return <li key={i} >
                      <button className='p-3 text-sm hover:bg-hover-option active:bg-light-color'
                        onClick={handleDropdown}>
                        {option}
                      </button></li>
                  })}
                </ul>
              </div>
            }
          <div className='flex flex-1 flex-col items-center justify-center w-full gap-10'>
            <ReCAPTCHA sitekey='6LeTy1soAAAAAAHKzYpT4lqFgH_nGWfcaNg8Nukc' onChange={handleCaptcha} />
            <Button variant='primary-medium' className='w-[100%]' onClick={handleSubmit}>Profession Overview</Button>
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
            <div className="relative">
              <ul className='p-2 absolute w-[374px] menu dropdown-content z-[99] bg-light-color rounded-box'>
                {isLoading && <li className="flex w-full justify-center items-center">
                  <span className="loading loading-dots loading-xs"></span>
                </li>}
                {professionOptions.length > 0 && professionOptions.map((option: string, i: number) => {
                  return <li key={i} >
                    <button className='p-3 text-sm hover:bg-hover-option active:bg-light-color'
                      onClick={handleDropdown}>
                      {option}
                    </button></li>
                })}
              </ul>
            </div>
          }
          <div className='flex flex-1 flex-col items-center justify-center w-full gap-10'>
            <ReCAPTCHA sitekey='6LeTy1soAAAAAAHKzYpT4lqFgH_nGWfcaNg8Nukc' onChange={handleCaptcha} />
            <Button variant="primary-medium" className='w-[100%]' onClick={handleSubmit}>Explore Jobs</Button>
          </div>
        </div>
      </Content>
    </Root>
  )
}

export default Form;