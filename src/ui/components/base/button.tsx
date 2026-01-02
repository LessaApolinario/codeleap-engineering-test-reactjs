import type { PropsWithChildren } from "react"

interface ButtonProps {
  type?: "button" | "submit"
  disabled?: boolean
  onClick?: () => void
}

export function Button({
  children,
  type,
  disabled,
  onClick,
}: PropsWithChildren<ButtonProps>) {
  return (
    <button
      type={type ?? "button"}
      disabled={disabled ?? false}
      className={`bg-[#7695EC] text-white rounded-lg px-4 py-1 ${
        disabled ? "cursor-not-allowed" : "cursor-pointer"
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
