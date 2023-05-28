/**
 * Header.jsx
 */


import { useContext } from 'react'
import { SliderContext } from "../contexts/SliderContext"


export const Header = () => {
  const { value } = useContext(SliderContext)

  return (
    <h1>
      React Slider value: {value}
    </h1>
  )
}