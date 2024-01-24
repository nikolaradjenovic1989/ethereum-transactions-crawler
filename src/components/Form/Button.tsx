import cn from 'classnames'

type ButtonProps = {
  disabled?: boolean
  value: string
}

const Button = ({ disabled = false, value }: ButtonProps) => {
  const buttonClass = cn('bg-indigo-600 font-bold py-2 px-4 rounded', {
    'opacity-50 cursor-not-allowed': disabled,
    'hover:bg-indigo-700': !disabled,
  })

  return (
    <div className="flex justify-center mt-4">
      <button disabled={disabled} className={buttonClass} type="submit">
        {value}
      </button>
    </div>
  )
}

export default Button
