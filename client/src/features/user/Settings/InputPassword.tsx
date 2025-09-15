import { Eye, EyeOff, KeyRound } from 'lucide-react'
import React from 'react'

const InputPassword =  (
    id: string,
    label: string,
    value: string,
    setter: (val: string) => void,
    isVisible: boolean,
    setIsVisible: (visible: boolean) => void
  ) => (
    <div className="flex flex-col w-full md:w-[22rem] gap-2">
      <label className="text-xs text-text-gray" htmlFor={id}>
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          placeholder={label}
          type={isVisible ? "text" : "password"}
          value={value}
          onChange={(e) => setter(e.target.value)}
          className="w-full border-b rounded-lg bg-input py-2 pr-10 pl-10 font-poppins text-sm text-text-gray"
        />
        <KeyRound
          strokeWidth={1}
          size={20}
          className="absolute left-2 top-1/2 -translate-y-[50%] text-text-gray"
        />
        <button
          type="button"
          onClick={() => setIsVisible(!isVisible)}
          className="absolute right-2 top-1/2 -translate-y-[50%] text-text-gray cursor-pointer"
        >
          {isVisible ? <Eye size={20} /> : <EyeOff size={20} />}
        </button>
      </div>
    </div>
  )


export default InputPassword
