import react, {useState} from 'react'
import { dataBeer } from '../data'

function updateMe(){
    const [data, setData] = useState()

    function showBelow5() {
        setData(dataBeer.abv)
    }
    return(
        <div>
        <h1>Welcome to my first react app</h1>
        </div>
        )}

export default updateMe