interface ButtonProps {
  type: string;
}

const Button = ({ type }: ButtonProps) => {

  return (
    <>
      <button
        className={`bg-[var(--white)] px-[25px] py-[4px] text-[13px] font-semibold rounded-sm 
        ${type === 'Cancel' ? 'text-[var(--red)]' : 'text-[var(--blue)]'} 
        hover:bg-[var(--blue-light)]`}
        type={'submit'}
        onClick={close}
      >
        {type}
      </button>
    </>
  );
};

export default Button;
