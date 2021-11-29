import { BeerProvider } from './providers/beerProvider'
// import Name from './components/name'
import './App.css'
import Welcome from './components/welcome'
// import Svg from './components/svg'
import BarChart from './components/BarChart'
import {dataBeer} from './data'


function App() {
  return (
    <BeerProvider>
      <Welcome />
      <BarChart data={dataBeer} />
      {/* <Name />     */}
      {/* <Svg /> */}
    </BeerProvider>
  );
}

export default App;
