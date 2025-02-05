import { Chart as ChartJS } from "chart.js/auto"
import { useState } from "react"
import { Bar } from "react-chartjs-2"

export default function BarGraph() {
    const currentYear = new Date().getFullYear()

    const labels = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "October",
        "November",
        "December",
    ]
    const [data, setData] = useState({
        labels: labels,
        datasets: [
            {
                label: "Revenue " + currentYear,
                backgroundColor: "#284b63", //["red", "green", "blue", "pink"],
                borderColor: "rgb(255, 99, 132)",
                width: 700,
                // data: [0, 10, 5, 2, 20, 30, 45, 30, 20, 12, 9, 26],
            },
        ],
    })

    /*
    const options = {
        scales: {
            xAxes: [
                {
                    type: "category",
                    barThickness: 6, // number (pixels) or 'flex'
                    maxBarThickness: 8,
                    //   barPercentage: 0.4,
                },
            ],
        },
    } */
    return (
        <div>
            {/*options={options}*/}
            <Bar data={data} />
        </div>
    )
}
