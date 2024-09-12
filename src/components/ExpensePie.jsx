import { Chart as ChartJS } from "chart.js/auto";
import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";

export default function ExpensePie(props) {
    // console.log("TEST + ", props.expensesData)

    const [data, setData] = useState({
        labels: [],
        datasets: [
            {
                label: "Revenue",
                backgroundColor: [
                    "#A3C4F3",
                    "#8EECF5",
                    "#90DBF4",
                    "#B9FBC0",
                    "#FFCFD2",
                    "#FBF8CC",
                    "#FDE4CF",
                    "#CFBAF0",
                    "#F1C0E8",
                    "#98F5E1",
                ],
                borderColor: "black",

                data: [],
            },
        ],
    })

    useEffect(() => {
        console.log("Test")
        const expenses = props.expensesData[0].expenses
        console.log(expenses)
        const amt = expenses.map((data) => data.expense_amt)
        const names = expenses.map((data) => data.expense_name)

        setData({
            labels: names,
            datasets: [
                {
                    label: "Expenses",
                    backgroundColor: [
                        "#A3C4F3",
                        "#8EECF5",
                        "#90DBF4",
                        "#B9FBC0",
                        "#FFCFD2",
                        "#FBF8CC",
                        "#FDE4CF",
                        "#CFBAF0",
                        "#F1C0E8",
                        "#98F5E1",
                    ],
                    borderColor: "black",

                    data: amt,
                },
            ],
        })
    }, [props.expensesData])

    return (
        <div>
            {props.expensesData[0].expenses.length > 0 ? (
                <div style={{ width: 400 }}>
                    <h4>My Pie</h4>
                    <Pie data={data} />
                </div>
            ) : (
                <div>No DATA</div>
            )}
        </div>
    )
}
