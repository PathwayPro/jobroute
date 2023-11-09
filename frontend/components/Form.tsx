import { Root, List, Trigger, Content } from '@radix-ui/react-tabs';
import { ChangeEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { trim } from '@/utils/utils';
import { useDebounce } from '@/hooks/useDebounce';
import { useAutocomplete } from '@/hooks/useAutocomplete';
import { useCaptcha } from '@/hooks/useCaptcha';
import ReCAPTCHA from 'react-google-recaptcha';
import Paragraph from '@/ui/Paragraph';
import Select from '@/ui/Select';
import InputField from '@/ui/InputField';

interface FormProps {
  provinces: string[];
}

const formButtonStyles = 'flex w-full h-[48px] rounded-full font-bold normal-case text-base items-center justify-center py-4 px-8 bg-primary text-light-color hover:bg-dark active:bg-active-color hover:flex-row-reverse transition hover:duration-150 disabled:bg-disabled';

const Form = ({ provinces }: FormProps) => {
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [profession, setProfession] = useState<string>('');
  const [dropdownToggle, setDropdownToggle] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const router = useRouter();
  const debouncedValue = useDebounce(searchTerm, 500);

  const { professionOptions, isLoading } = useAutocomplete(debouncedValue, selectedLocation);
  const { captcha, handleCaptcha } = useCaptcha();

  useEffect(() => {
    if (debouncedValue === '') {
      setDropdownToggle(false);
    } else {
      setDropdownToggle(true);
    }
  }, [debouncedValue]);

  const handleSubmit = () => {
    router.push(`/roadmap?province=${trim(selectedLocation)}&profession=${trim(profession)}`);
  };

  function handleProfessionChange(e: ChangeEvent<HTMLInputElement>) {
    const regex = /^[a-zA-Z\s]*$/;
    if (e.target.value === '') {
      setProfession('');
      setSearchTerm('');
      setDropdownToggle(false);
      return;
    }
    if (!regex.test(e.target.value)) {
      return;
    }
    setProfession(e.target.value);
    setSearchTerm(e.target.value);
  }

  const handleDropdown = (event: any) => {
    setProfession(event.target.textContent);
    setDropdownToggle(false);
  }

  const resetForm = () => {
    setProfession('');
    setSelectedLocation('');
    setDropdownToggle(false);
  };

  const triggerStyle = "bg-white flex-1 px-0 py-[10px] w-[50%] items-center text-secondary-text text-base leading-[25.28px] text-center hover:color-primary data-[state=active]:text-black data-[state=active]:shadow-inner data-[state=active]:shadow-inner data-[state=active]:font-bold"

  return (
    <Root className='flex flex-col w-[100%]' onValueChange={resetForm} defaultValue="tab1">
      <List className='flex flex-shrink-0 border-b-[1px] border-[#D0D0D0] justify-around'>
        <Trigger className={triggerStyle} value="tab1">
          I know what job<br /> I want
        </Trigger>
        <Trigger className={triggerStyle} value="tab2">
          I want to start a new career
        </Trigger>
      </List>
      <Content value="tab1">
        <div className='flex flex-col py-[36px] gap-[16px]'>
          <Select
            options={provinces}
            defaultValue={0}
            onChange={(event) => {
              setSelectedLocation(event.target.value);
            }} />
          <InputField onChange={handleProfessionChange} value={profession} placeholder='Job title' />
          {dropdownToggle &&
            <div className="relative">
              <ul className='p-2 w-[370px] shadow-outline absolute menu dropdown-content z-[99] bg-light-color rounded-box'>
                {isLoading && <li className="flex w-full justify-center items-center">
                  <span className="loading loading-dots loading-xs"></span>
                </li>}
                {!isLoading && professionOptions?.length === 0 && (
                  <div className='flex items-center justify-center'>
                    <Paragraph>No results found</Paragraph>
                  </div>
                )}
                {!isLoading && professionOptions?.length > 0 && (
                  professionOptions?.map((option: string, i: number) => {
                    return (<li key={i}>
                      <button className='p-3 text-sm hover:bg-hover-option active:bg-light-color'
                        onClick={handleDropdown}>
                        {option}
                      </button></li>
                    )
                  }
                  ))}
              </ul>
            </div>
          }
          <div className='flex flex-1 flex-col items-center justify-center w-full gap-10'>
            <ReCAPTCHA sitekey='6LeTy1soAAAAAAHKzYpT4lqFgH_nGWfcaNg8Nukc' onChange={handleCaptcha} />
            <button
              disabled={!captcha || !profession || !selectedLocation}
              className={formButtonStyles}
              onClick={handleSubmit}
            >
              Profession Overview
            </button>
          </div>
        </div>
      </Content>
      <Content value="tab2">
        <div className='flex flex-col py-[36px] gap-[16px]'>
          <Select
            options={provinces}
            defaultValue={0}
            onChange={(event) => {
              setSelectedLocation(event.target.value);
            }} />
          <InputField onChange={handleProfessionChange} value={profession} placeholder='Your current job' />
          {dropdownToggle &&
            <div className="relative">
              <ul className='p-2 absolute w-[370px] shadow-outline menu dropdown-content z-[99] bg-light-color rounded-box'>
                {isLoading && <li className="flex w-full justify-center items-center">
                  <span className="loading loading-dots loading-xs"></span>
                </li>}
                {!isLoading && professionOptions?.length === 0 && (
                  <div className='flex items-center justify-center'>
                    <Paragraph>No results found</Paragraph>
                  </div>
                )}
                {!isLoading && professionOptions?.length > 0 && professionOptions?.map((option: string, i: number) => {
                  return <li key={i}>
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
            <button
              disabled={!captcha || !profession || !selectedLocation}
              className={formButtonStyles}
              onClick={handleSubmit}
            >
              Explore Jobs
            </button>
          </div>
        </div>
      </Content>
    </Root>
  )
}

export default Form;