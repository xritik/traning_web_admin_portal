import React from 'react'
import errorImg  from './img/404.webp'
import { Link } from 'react-router-dom'

const MissingPage = () => {
  return (
    <div className='missingPage'>
        <img src={errorImg} alt='img'/>
        <h1>Page Not Found!</h1>
        <Link>Home</Link>
    </div>
  )
}

export default MissingPage