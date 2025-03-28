import React from 'react'
import { Navigate } from 'react-router-dom'
export default function  NewsApi ()  {
  return (
    <div>
        <a Navigate={"/news"}>NewsApi</a>
        <input type="text" placeholder='Search News ' />
        
    </div>
  )
}
