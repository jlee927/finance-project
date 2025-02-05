import { Chart as ChartJS } from "chart.js/auto";
import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";

export default function ExpensePie(props) {
    // console.log("TEST + ", props.expensesData)
    const options = {
        plugins: {
            legend: {
                position: "right",
            },
            //   datalabels: { // Use datalabels plugin for data labels
            //     anchor: 'end', // Position label relative to data point
            //     align: 'top', // Vertical alignment of label
            //     offset: 5, // Distance from the data point
            //   },
        },
    }

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
        // console.log("Test")
        const expenses = props.expensesData[0].expenses
        // console.log(expenses)
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
                <div className="expenses--pie" style={{ width: 400 }}>
                    <h2>Total Expenses</h2>
                    <Pie data={data} options={options} />
                </div>
            ) : (
                <div className="expenses--pie">Add Data to View Chart!</div>
            )}
        </div>
    )
}
