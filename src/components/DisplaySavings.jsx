import ChartPie from "./SavingsPie";
import { useEffect, useState } from "react";

export default function DisplaySavings(props) {
    const user = JSON.parse(localStorage.getItem("user"))
    const apiUrl = import.meta.env.VITE_API_BASE_URL
    const [savingsData, setSavingsData] = useState([
        {
            savings: [
                {
                    _id: "",
                    savings_period: "",
                    savings_name: "",
                    savings_amt: "",
                },
            ],
        },
        { totalSavings: "" },
    ])

    const fetchRevenue = async () => {
        try {
            const res = await fetch(
                `${apiUrl}/data/get-savings/${user._id}/${props.currentPeriod}`
            )

            if (!res.ok) {
                throw new Error("Network was not okay")
            }
            const result = await res.json()

            setSavingsData(result)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        fetchRevenue()
    }, [props.currentPeriod, props.submitState])

    const renderedSavings = savingsData[0].savings.map((savings, key) => {
        return (
            <div key={key}>
                <h4>
                    <button type="button">Click</button>
                    {savings.savings_name} ${savings.savings_amt} (
                    {savings.savings_period})
                </h4>
            </div>
        )
    })

    // console.log(savingsData[0].savings.length)

    return (
        <div>
            <h2>Savings During {props.currentPeriod}</h2>
            <div>{renderedSavings}</div>

            <ChartPie savingsData={savingsData} />
            {/* <ModularPie data={savingsData[0].savings} /> */}
        </div>
    )
}
