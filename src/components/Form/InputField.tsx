import cn from 'classnames'
import { SearchIcon } from '../Icons'

type FieldTypes = 'text' | 'number' | 'password' | 'email'

type InputFieldProps = {
  center?: boolean
  className: string
  disabled?: boolean
  name: string
  placeholder: string
  showSearchIcon?: boolean
  type?: FieldTypes
  value: string
  onChange: React.Dispatch<React.SetStateAction<string>>
}

const InputField = ({
  center = false,
  className,
  disabled = false,
  name,
  placeholder,
  showSearchIcon = false,
  type = 'text',
  value,
  onChange,
}: InputFieldProps) => {
  const containerClass = cn('flex items-center gap-1 size-full mb-2', {
    'justify-center': center,
    'opacity-50': disabled,
  })

  return (
    <div className={containerClass}>
      {showSearchIcon && <SearchIcon />}
      <input
        className={className}
        disabled={disabled}
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

export default InputField
