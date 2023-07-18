import { useEffect } from "react";

const Body = () => {
  const provinces = [
    'Country or Province',
    'Canada',
    'Alberta',
    'British Columbia',
    'Manitoba',
    'New Brunswick',
    'Newfoundland and Labrador',
    'Northwest Territories',
    'Nova Scotia',
    'Nunavut',
    'Ontario',
    'Prince Edward Island',
    'Quebec',
    'Saskatchewan',
    'Yukon'
  ];

  const fieldsCommonStyle = 'w-[490px] mb-10 text-xl border-black bg-primeColor';
  const btnCommonStyle = 'mb-[1.5rem] btn w-[290px]';

  const selectable = (list: string[], label: string) => {
    return (
      <label className='flex flex-col mb-5 gap-y-4'>
        <span className='text-center'>{label}</span>
        <select defaultValue={list[0]} className={`${fieldsCommonStyle} select select-bordered `}>
          {
            list.map((string, i) => (<option disabled={i === 0} className='text-xl group-hover:bg-gray-100' key={string}>{string}</option>))
          }
        </select>
      </label>
    )
  }

  return (
    <div className='flex flex-col items-center justify-start mt-[2rem] col-span-12 min-grow' >
      <h2 className='mb-12 text-6xl font-bold'>Let’s get started!</h2>
      {selectable(provinces, 'Begin your search by selecting the Country or Province')}
      <input type='text' className={`${fieldsCommonStyle} input input-bordered`} placeholder='Search or type profession' />
      <button className={ `${btnCommonStyle} btn-secondary` }>See the roadmap</button>
      <button className={ `${btnCommonStyle} btn-primary` }>Match your skills</button>
      <input type='text' className={`${fieldsCommonStyle} input input-bordered`} placeholder='Search or type profession' />
      <button className={ `${btnCommonStyle} btn-neutral` }>Match</button>
    </div>
  )
}

export default Body;
