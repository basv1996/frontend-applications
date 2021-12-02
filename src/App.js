import { BeerProvider } from './providers/beerProvider'
import { Provider } from './components/provider'
import './App.css'
import BarChart from './components/BarChart'
import {dataBeer} from './data'

function App() {
  return (
    <Provider>
    <BeerProvider>
      <BarChart data={dataBeer} />
    </BeerProvider>
    </Provider>
  )
}

export default App
