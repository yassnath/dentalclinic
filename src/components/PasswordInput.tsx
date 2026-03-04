import { useState } from "react";
import type { InputHTMLAttributes } from "react";

type PasswordInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  wrapperClassName?: string;
};

function EyeOpenIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5" aria-hidden="true">
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeClosedIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5" aria-hidden="true">
      <path d="M3 3l18 18" />
      <path d="M10.6 10.6a2 2 0 1 0 2.8 2.8" />
      <path d="M9.2 5.4A11.8 11.8 0 0 1 12 5c6.5 0 10 7 10 7a18.2 18.2 0 0 1-3.2 4.2" />
      <path d="M6.2 6.2A18.5 18.5 0 0 0 2 12s3.5 7 10 7c1.6 0 3-.4 4.3-1" />
    </svg>
  );
}

export default function PasswordInput({ className = "", wrapperClassName = "", ...props }: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className={`relative ${wrapperClassName}`.trim()}>
      <input {...props} type={visible ? "text" : "password"} className={`${className} pr-11`.trim()} />
      <button
        type="button"
        onClick={() => setVisible((prev) => !prev)}
        className="absolute inset-y-0 right-0 inline-flex items-center px-3 text-gray-500 transition hover:text-blue-700 focus:outline-none"
        aria-label={visible ? "Sembunyikan password" : "Tampilkan password"}
        title={visible ? "Sembunyikan password" : "Tampilkan password"}
      >
        {visible ? <EyeClosedIcon /> : <EyeOpenIcon />}
      </button>
    </div>
  );
}
