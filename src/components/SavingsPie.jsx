import { Chart as ChartJS } from "chart.js/auto";
import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";

export default function ExpensePie(props) {
    // console.log("TEST + ", props.savingsData)

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
        const savings = props.savingsData[0].savings
        // console.log(savings)
        const amt = savings.map((data) => data.savings_amt)
        const names = savings.map((data) => data.savings_name)

        setData({
            labels: names,
            datasets: [
                {
                    label: "Expenses",
                    backgroundColor: [
                        "#CFBAF0",
                        "#8EECF5",
                        "#B9FBC0",
                        "#A3C4F3",
                        "#90DBF4",
                        "#FBF8CC",
                        "#FFCFD2",
                        "#FDE4CF",
                        "#F1C0E8",
                        "#98F5E1",
                    ],
                    borderColor: "black",

                    data: amt,
                },
            ],
        })
    }, [props.savingsData])

    return (
        <div>
            {props.savingsData[0].savings.length > 0 ? (
                <div style={{ width: 400 }} className="savings--pie">
                    <h2>Total Savings</h2>
                    <Pie data={data} options={options} />
                </div>
            ) : (
                <div className="savings--pie">Add Data to View Chart!</div>
            )}
        </div>
    )
}
