interface SpinnerProps {
  color: string
}

export function Spinner({ color }: SpinnerProps) {
  return (
    <div
      className="animate-spin rounded-full h-24 w-24 border-r-4 border-b-4 border-l-4 border-t-transparent"
      style={{
        borderColor: color,
      }}
    />
  )
}
