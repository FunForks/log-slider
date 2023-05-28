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
      Logarithmic Slider value: {stringValue}
    </h1>
  )
}