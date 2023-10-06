import * as React from 'react';
import '../assets/styles/login.css'

const Button = ({ value, onClick }) => {
  return (
    <div onClick={onClick} className="loginBtn px-4 py-2 rounded-lg text-center cursor-pointer">
      {value}
    </div>
  )
}

export default Button