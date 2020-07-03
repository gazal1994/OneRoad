import React from "react";
import { inject,observer} from "mobx-react";


const AnalyticsResults =inject('users','rides')(observer((props) => {
    const moneyEarnd=props.moneyEarnd
    const moneySpend=props.moneySpent
    const ridesJoined=props.ridesJoined
    const carpools = props.carpools
   
    const handleClick = () => {
       
    }
    return (
        <div>
            <p>moneyEarnd:{moneyEarnd}</p>
            <p>moneySpend:{moneySpend}</p>
            <p>ridesJoined:{ridesJoined}</p>
            <p>accomplished carpools:{carpools}</p>

        </div>
    )
}
))
export default AnalyticsResults;