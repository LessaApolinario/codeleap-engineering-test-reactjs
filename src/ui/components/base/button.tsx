import type { PropsWithChildren } from "react"

interface ButtonProps {
  type?: "button" | "submit"
  disabled?: boolean
  color?: string
  textColor?: string
  className?: string
  onClick?: () => void
}

export function Button({
  children,
  type,
  disabled,
  color,
  textColor,
  className,
  onClick,
}: PropsWithChildren<ButtonProps>) {
  return (
    <button
      type={type ?? "button"}
      disabled={disabled ?? false}
      style={{ color: textColor ?? "#000", backgroundColor: color ?? "#fff" }}
      className={`rounded-lg px-4 py-1 ${
        disabled ? "cursor-not-allowed" : "cursor-pointer"
      } ${className ?? ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
