import React from 'react'
import './Button.scss'
const Button = ({
  text,
  className = '',
  onClick,
  type = 'button',
  disabled = false,
  style,
  backico = '',
  icons }) => {
  
    const backIconSrc =
        backico == 'wh' ? "/images/arrow-back-wh.svg" :
        backico == 'bh' ? "/images/arrow-back.svg" : null


  return (
    <button
      type={type}
      onClick={onClick}
      className={`btn ${className}`}
      disabled={disabled}
      style={style}
    >
      {
        backIconSrc && <img src={backIconSrc} />
      }
      {text}
      {icons && <img src='/images/arrow.png' />}
    </button>
  )
}

export default Button