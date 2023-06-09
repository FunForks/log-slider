/**
 * App.jsx
 */

import { SliderProvider } from './contexts/SliderContext'
import { Header } from './components/Header'
import { Slider } from './components/Slider'

function App() {

  return (
    <SliderProvider>
      <Header />
      <Slider />
      <br />
      <a
        href="https://github.com/FunForks/log-slider"
      >
        GitHub Repository
      </a>
    </SliderProvider>
  );
}

export default App;
