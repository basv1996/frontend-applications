import { createContext, useState } from 'react'

export const BeerContext = createContext()

export function Provider({ children }) {
    const [selectedBeer, setBeer] = useState(0)

    console.log(selectedBeer)
        
    return (
        <>
            <BeerContext.Provider value={{ selectedBeer, setBeer }}>
                {children}
            </BeerContext.Provider>
        </>
    )
}