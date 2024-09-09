import { Chart as ChartJS } from "chart.js/auto";
import { useState } from "react";
import { Line } from "react-chartjs-2";

export default function BarGraph() {
   const labels = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
   ];
   const [data, setData] = useState({
      labels: labels,
      datasets: [
         {
            label: "Revenue 2024",
            backgroundColor: "pink", //["red", "green", "blue", "pink"],
            borderColor: "rgb(255, 99, 132)",

            data: [0, 10, 5, 2, 20, 30, 45],
         },
      ],
   });
   return (
      <div>
         <Line data={data} options={{}} />
      </div>
   );
}
