import { BeerProvider } from './providers/beerProvider'
import { Provider } from './components/provider'
import Filters from './components/filter'
import './App.css'
import BarChart from './components/BarChart'
import {dataBeer} from './data'

function App() {
  return (
    < Provider>
    <BeerProvider>
    < Filters />
      <BarChart data={dataBeer} />
    </BeerProvider>
    </Provider>
  );
}

export default App;
