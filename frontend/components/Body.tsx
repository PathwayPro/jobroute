import { server } from "@/tools/routes";
import ReCAPTCHA from 'react-google-recaptcha';
import { Btn, Header1, Select, InputField } from "./Elements";
import { MainProps } from "@/types/PropsTypes";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Body: React.FC<MainProps> = ({ provinces, searchBy }) => {
  const [profession, setProfession] = useState<string>('');
  const [industry, setIndustry] = useState<string>('');
  const [province, setProvince] = useState<string>('');
  const [showProvince, setProvinces] = useState<boolean>(false);
  const [searchType, setSearchType] = useState<boolean>(false);
  const [debouncedTerm, setDebouncedTerm] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [professionOptions, setProfessionOptions] = useState<string[]>([]);
  const [dropdownToggle, setDropdownToggle] = useState<boolean>(false);
  const [captcha, setCaptcha] = useState(false);
  const router = useRouter();

  const handleSubmit = (
    province: string,
    profession: string,
    industry: string
  ) => {
    const prepareStr = (inputString: string) => inputString.trim().toLowerCase();

    router.push(`/roadmap?province=${prepareStr(province)}
&profession=${prepareStr(profession)}`);
  }

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);

  useEffect(() => {
    const search = async () => {
      const url = `${server}/autocomplete?term=${debouncedTerm}&province=${province}`;
      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        setProfessionOptions(JSON.parse(await response.json()));

        setDropdownToggle(true);
      } catch (error) {
        console.error('Error in fetchServerData:', error);
        throw error;
      }
    };

    if (debouncedTerm) {
      search();
    }
  }, [debouncedTerm]);

  const handleDropdown = (event: any) => {
    setProfession(event.target.textContent);
    setDropdownToggle(false);
  }

  const handleChange = (event: any) => {
    setProfession(event.target.value)
    setSearchTerm(event.target.value);
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
        setCaptcha(false)
        alert('captcha failed');
      }
    } catch (err) {
      alert(`An error occurred while verifying the reCAPTCHA:\n${err}`);
    }
  }

  return (
    <div className='flex flex-col items-center grow justify-start mt-[2rem] ' >
      <Header1 className='mt-[6rem]'>Let’s get started!</Header1>

      <Select
        className='mt-[3rem]'
        disabled={[0]}
        defaultValue={0}
        onChange={(event) => {
          setProvinces(true);
          setProvince(event.target.value)
        }}
        label='Begin your search by selecting the Country or Province'
        options={provinces}
      />

      {showProvince &&
        <Select
          className='mt-[1.5rem]'
          disabled={[0, 1, 2]}
          defaultValue={0}
          onChange={() => setSearchType(true)}
          label='Now you can choose to search by industry or by profession'
          options={searchBy}
        />
      }

      {searchType && <>
        <div className='dropdown'>
          <InputField
            value={profession}
            className='w-[30.5rem] mt-[1.5rem]'
            onChange={handleChange}
            label='Search or type the profession you want to know more about'
          />
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
        </div>

        <ReCAPTCHA className='mt-12' sitekey='6Lc2aOUnAAAAAMrKLgyJRqRCgIfpmySyraGG5U-v'
          onChange={handleCaptcha} />
        {captcha &&
          <Btn color='primary' className='mt-[2.5rem]' onClick={() => handleSubmit(province, profession, industry)}> See the roadmap</Btn>
        }

      </>
      }
    </div >
  )
}

export default Body;
