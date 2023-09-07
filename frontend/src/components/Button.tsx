interface ButtonProps {
  type: string
}

const Button = ({ type }: ButtonProps) => {
  return (
    <button 
        className={`bg-[var(--white)] px-[25px] py-[4px] text-[13px] font-semibold rounded-sm text-[var(--blue)]
        hover:bg-[var(--blue-light)]`}
        type="submit"
    >
        {type}
    </button>
  )
}

export default Button
