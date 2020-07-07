import React from "react";
import { inject, observer } from "mobx-react";


const AnalyticsResults = inject('users', 'rides')(observer((props) => {
    const income = props.income
    const expense = props.expense
    const ridesJoined = props.ridesJoined
    const carpools = props.carpools


    return (
        <div>
            <p>moneyEarnd:{income ? income : 0}</p>
            <p>moneySpend:{expense ? expense : 0}</p>
            <p>ridesJoined:{ridesJoined}</p>
            <p>accomplished carpools:{carpools}</p>
        </div>
    )
}
))
export default AnalyticsResults;