/**
 * Header.jsx
 */


import { useContext } from 'react'
import { SliderContext } from "../contexts/SliderContext"


export const Header = () => {
  const { rangeData } = useContext(SliderContext)
  const { stringValue } = rangeData

  return (
    <h1>
      React Slider value: {stringValue}
    </h1>
  )
}