interface InputFieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField = ({ label, value, onChange }: InputFieldProps) => {
  return (
    <div className="relative m-4 max-w-[fit-content] group">
      <input value={value} onChange={onChange} type="text" className="outline-none px-3 py-3 peer" placeholder=" " />

      <label className="absolute left-[9px] top-px text-xs text-[#42444D] transition-all duration-300 px-1 transform -translate-y-1/2 pointer-events-none 
  peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base group-focus-within:!top-px group-focus-within:!text-xs group-focus-within:!text-[#42444D]">{label}</label>

      <fieldset className="inset-0 absolute border border-[#D0D0D0] rounded-lg pointer-events-none mt-[-9px] invisible peer-placeholder-shown:visible 
  group-focus-within:!border-[#42444D] group-focus-within:border-2 group-hover:border-gray-700">
        <legend className="ml-2 px-0 text-xs transition-all duration-300 invisible max-w-[0.01px] group-focus-within:max-w-full group-focus-within:px-1 whitespace-nowrap">{label}</legend>
      </fieldset>

      <fieldset className="inset-0 absolute border border-[#D0D0D0] rounded-lg pointer-events-none mt-[-9px] visible peer-placeholder-shown:invisible 
  group-focus-within:border-2 group-focus-within:!border-[#42444D] group-hover:border-gray-700">
        <legend className="ml-2 text-xs invisible px-1 max-w-full whitespace-nowrap">{label}</legend>
      </fieldset>
    </div>

  )
}

export default InputField;