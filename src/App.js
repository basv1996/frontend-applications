import { BeerProvider } from './providers/beerProvider'
import { Provider } from './components/provider'
import './App.css'
import BarChart from './components/BarChart'
import { useData } from './components/useData'
//import {dataBeer} from './data'

function App() {
  return (
    <Provider>
    <BeerProvider>
      <BarChart data={useData} />
    </BeerProvider>
    </Provider>
  )
}

export default App
