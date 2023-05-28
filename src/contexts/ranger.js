/**
 * ranger.js
 *
 * This script acts as a helper for a logarithmic range slider.
 * It allows the slider to represent any values between 100 and
 * TOTAL, which is set slightly higher than the MAX value it will
 * be used with.
 *
 * The slider it was designed for represents words in language
 * corpus, arranged by frequency of use. A few common words are
 * used almost all the time; most words are used very rarely, if
 * at all in a given text.
 *
 * A word that is not in the corpus will be considered as being
 * beyond MAX, but somehow included in TOTAL. This will include
 * the names of people, places and organizations, as well as
 * very technical words.
 *
 * The slider will show words in blocks of similar frequencies:
 * - The first 100 words are assumed to be known
 * Levels A1 (500) and A2 (1000)
 * - Intervals at 200, 300, ... 1000
 * - Intervals at 1200, 1400, 1600, 1800, 2000
 * Levels B1 (2000) and B2 (4000)
 * - Intervals at 2500, 3000, 3500, 4000, 4500, 5000
 * - Intervals at 6000, 7000, 8000, 9000, 10000
 * Levels C1 (8000), C2 (16000) and near-native
 * - Intervals at 12000, 14000, 16000, 18000, 20000
 * - Intervals at 25000, 30000, 35000, 40000, 45000, 50000
 * Articulate native speaker
 * - Intervals at 60000, 70000, 80000, 90000, 100000
 *
 * `max` may be set to less than 90000, in which case the highest
 * levels will not be accessible
 */


const HUNDRED = 100
let MAX    =  90000
let TOTAL  = 100000
let LOG    =      3



/**
 * setMax is called by TextContext. It calculates a MAX number
 * which is rounded up from the input `max`, and a TOTAL which is
 * a rounded step above that.
 *
 * @param {number} max
 * @returns {{ MAX: number; TOTAL: number; }}
 */
export const setMax = max => {
  if (!isNaN(max) && max > 0 && max < 100000 ) {
    ;({ high: MAX, top: TOTAL } = _getRange(max));
    LOG = Math.log10(TOTAL / HUNDRED)
  }

  const maxRatio = Math.log10(MAX / HUNDRED) / LOG

  return { MAX, maxRatio, TOTAL }
}



/**
 * getAdjusted() is called by:
 *   setEndPoints in TextContext, to adjust ratio
 *   Range component, to set low and high values
 *
 * @param {number} ratio: value between 0.0 and 1.0
 * @returns an object with the format
 * {
 *   low:  integer - lowest number in the range where `ratio` lies
 *   high: integer - highest number in the range
 *   less:  float  - ratio at lowest number in previous range
 *   ratio: float  - adjusted value between 0.0 and 1.0,
 *                   representing the relative position of low
 *   more:  float  - ratio at number high
 * }
 */
export const getAdjusted = (ratio) => {
  const scaled = ratio * LOG
  const exact  = Math.min(MAX, Math.round(10**scaled * HUNDRED))

  let { drop, low, high } = _getRange(exact)
  if (low < 1000) {
    drop = Math.max(HUNDRED, Math.floor(drop / 100) * 100)
    low = Math.floor(low / 100) * 100
    high = Math.ceil(high / 100) * 100
  }

  const less = Math.log10(drop / HUNDRED) / LOG
  ratio = Math.log10(low / HUNDRED) / LOG
  const more = Math.log10(high / HUNDRED) / LOG

  return { low, exact, high, less, ratio, more }
}



/**
 * Generates ratios between 0.0 and 1.0 for the range end points
 *
 * @param {array|string} values [ <100-MAX>, <100-MAX> ]
 * @returns {array} [ <0.0-1.0>, <0.0-1.0> ]
 */
export const getEnds = values => {
  return (
    Array.isArray(values)
      ? values
      : values.split(/\s*-\s*/)
    )
    .map(_getRatio)
}



export const getValues = ends => {
  return ends.map( value => {
    const { low } = getAdjusted(value)

    return low
  })
}



const _getRatio = value => Math.log10(value / HUNDRED) / LOG



/**
 * _getRange() is only called locally
 *
 * @param {} input
 * @returns {{
 *   drop: number - low rounded down to start of previous range
 *   low: number  - input rounded down to low end of range
 *   high: number - input rounded up to high end of range
 *   top: number  - high rounded up; allows for out of range values
 * }}
 *
 * Note: top is only useful for setMax
 */
const _getRange = (input) => {
  // input = Math.min(input, MAX)
  let magnitude = 1

  while (input > HUNDRED) {
    input /= 10
    magnitude *= 10
  }
  // 10 <= input <= 99

  let adjust = (input < 20)
             ? 2
             : (input < 50)
               ? 5
               : 10

  let [ low, high ] = [ Math.floor(input / adjust) * adjust,
                        Math.ceil(input / adjust) * adjust,
                      ]
  if (high === low) {
    high += adjust
  }
  // [10, 12]...[18, 20][20, 25]...[45, 50][50, 60]...[90, 100]

  adjust = (low <= 20)
           ? 2
           : (low <= 50)
             ? 5
             : 10
  const drop = (low - adjust) * magnitude

  adjust = (high < 20)
           ? 2
           : (high < 50)
             ? 5
             : 10
  const top = (high + adjust) * magnitude

  low *= magnitude
  high *= magnitude

  return { drop, low, high, top }
}