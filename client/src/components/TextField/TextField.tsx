import { ChangeEvent } from "react";

interface TextFieldType{
    type: string;
    placeholder: string;
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    className: string
}
export default function TextField({
    type,
    placeholder,
    value,
    onChange,
    className
}: TextFieldType) {
    return (
        <input 
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`${className}`}
        />
    )
}
