import { Btn, Header1, Select, InputField } from "./Elements";
import { MainProps } from "@/types/PropsTypes";
import Link from "next/link";
import { useState } from "react";

const Body: React.FC<MainProps> = ({ provinces, searchBy }) => {
  const [request, setRequest] = useState({});
  const [province, setProvince] = useState<boolean>(false);
  const [searchType, setSearchType] = useState<boolean>(false);

  return (
    <div className='flex flex-col items-center justify-start mt-[2rem] col-span-12 min-grow' >
      <Header1 className='mb-12 text-6xl font-bold'>Let’s get started!</Header1>

      <Select
        disabled={[0]}
        defaultValue={0}
        onChange={(event) =>{
          setProvince(true);
          setRequest({...request, province: event.target.value})
        }}
        label='Begin your search by selecting the Country or Province'
        options={provinces}
      />

      {province &&
        <Select
          disabled={[0, 1, 2]}
          defaultValue={0}
          onChange={() => setSearchType(true)}
          label='Now you can choose to search by industry or by profession'
          options={searchBy}
        />
      }

      {searchType &&
        <>
          <InputField onChange={(event) => setRequest({ ...request, profession: event.target.value })} label='Search or type the profession you want to know more about' />

          <Link href='/roadmap' ><Btn color='primary'>See the roadmap</Btn></Link>
        </>
      }
    </div>
  )
}

export default Body;
