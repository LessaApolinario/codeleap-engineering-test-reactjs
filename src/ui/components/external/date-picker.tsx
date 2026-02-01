import { enUS } from "date-fns/locale"
import { useEffect } from "react"
import * as D from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

interface DatePickerProps {
  className?: string
  placeholder?: string
  date: Date | null
  onSelectDate: (date: Date | null) => void
}

export function DatePicker({
  className,
  placeholder,
  date,
  onSelectDate,
}: DatePickerProps) {
  useEffect(() => {
    D.registerLocale("en", enUS)
  }, [])

  return (
    <div>
      <D.DatePicker
        className={className ?? ""}
        placeholderText={placeholder ?? "Select a date"}
        selected={date}
        onChange={onSelectDate}
      />
    </div>
  )
}
