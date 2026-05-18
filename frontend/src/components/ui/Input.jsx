import React from 'react'
import './Input.scss'
const Input = ({
  label,
  lable,
  type = "text",
  placeholder,
  name,
  value,
  onChange,
  onBlur,
  error,
  icon,
  disabled = false,
  className = '',
  ...props
}, ref) => {
  const inputLabel = label ?? lable

  return (
    <div className='input-group'>
      {inputLabel && <label className="input-label">{inputLabel}</label>}
      <div className="input-wrapper">
        {icon && <span className='input-icon'>{icon}</span>}
        <input
          ref={ref}
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          className={`input-field ${className}`.trim()}
          {...props}
        />
      </div>
      {error && <p className='input-error'>{error}</p>}
    </div>
  )
}

export default Input