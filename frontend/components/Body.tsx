import { Btn, Header1, Select, InputField } from "./Elements";
import { MainProps, RequestType } from "@/types/PropsTypes";
import Link from "next/link";
import { useState } from "react";

const Body: React.FC<MainProps> = ({ provinces, searchBy }) => {
  const [request, setRequest] = useState({});
  const [showProvince, setProvinces] = useState<boolean>(false);
  const [searchType, setSearchType] = useState<boolean>(false);

  const handleSubmit = (request: RequestType) => {
     
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
          setRequest({ ...request, province: event.target.value })
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

      {searchType &&
        <>
          <InputField
            className='w-[30.5rem] mt-[1.5rem]'
            onChange={(event) => setRequest({ ...request, profession: event.target.value })}
            label='Search or type the profession you want to know more about'
          />

          <Link className='mt-[2.5rem]' href='/roadmap'>
            <Btn color='primary' onClick={() => handleSubmit(request)}> See the roadmap</Btn>
          </Link>
        </>
      }
    </div>
  )
}

export default Body;
