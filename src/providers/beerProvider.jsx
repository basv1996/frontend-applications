import { createContext, useState, useEffect } from "react"
import * as d3 from "d3"

const BeerContext = createContext(null)

export const BeerProvider = ({ children }) => {
    const [data, setData] = useState(null)

    useEffect(() => {
      d3.json("https://api.punkapi.com/v2/beers?page=1&per_page=11")
      .then((data) => {
        setData(data)
      })
    }, [])
    return (
        <BeerContext.Provider value={data}>{children}</BeerContext.Provider>
      )
    }
    
    export default BeerContext