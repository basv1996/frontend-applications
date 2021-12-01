import { BeerContext } from "./provider"
import { useContext } from "react"

const Filters = () => {
    const {setBeer} = useContext(BeerContext)

    const BeerClick = (e) => {
        setBeer(e.target.value)
    }

    return (
        <>
            <h3>Filter op alcohol percentage</h3>
            <span className='filters'>
                <button value='5' onClick={BeerClick}>Above 5</button>
                <button value='-5' onClick={BeerClick}>Under 5</button>
            </span>
        </>
    )
}

export default Filters