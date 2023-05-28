/**
 * SliderContext.jsx
 *
 * This context allows you to share the value of a specific slider
 * with other components.
 */

import { createContext, useState } from 'react'
import {
  setMax,
  getEnds,
  getValues,
  getAdjusted
} from './ranger.js'



const { maxRatio} = setMax(69999) // 1 less than what MAX will be



export const SliderContext = createContext()



export const SliderProvider = ({ children }) => {
  // <<< HARD-CODED
  const defaultValues = [1000, 5000]
  // HARD-CODED >>>

  const getStringValue = values => {
    return `${values[0]} - ${values[1]}`
  }

  const [ rangeData, setRangeData ] = useState(() => (
    {
      values: defaultValues,
      stringValue: getStringValue(defaultValues),
      ends: getEnds(defaultValues),
    }
  ))


  const setEnd = (ratio, end) => {
    const { ends } = rangeData

    if (end) {
      ends[1] = Math.min(ratio, maxRatio)
    } else {
      ends[0] = ratio
    }
    
    const values = getValues(ends)
    const stringValue = getStringValue(values)    

    setRangeData({ values, stringValue, ends})
  }


  return (
    <SliderContext.Provider
      value = {{
        rangeData,
        setEnd,
        getAdjusted
      }}
    >
      {children}
    </SliderContext.Provider>
  )
}