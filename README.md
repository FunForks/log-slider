# React Slider #

This project demonstrates how to use React components to create a slider that defines a range. The background of the slider is a 
gradient which shows the active range in darkening shades of red. Items outside the range are shown in black (below lower limit) and purple (above upper limit).

The scale of the slider is logarithmic, by default from 100 to
100 000. Divisions are made at useful intervals, by steps of:
* 100 from 100 to 1000
* 200 from 1000 to 2000
* 500 from 2000 to 5000
* 1000 from 5000 to 10000
* 2000 from 10000 to 20000
* 5000 from 20000 to 50000
* 10000 from 50000 to 100000
These divisions have roughly equal spacings between them.

See src/contexts/ranger.js for more details of this scale.

[Demo](https://funforks.github.io/log-slider)

## Enjoy!