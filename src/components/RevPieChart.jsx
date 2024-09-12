import { Chart as ChartJS } from "chart.js/auto";
import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";

export default function PieChart(props) {
   const apiUrl = import.meta.env.VITE_API_BASE_URL;
   const user = JSON.parse(localStorage.getItem("user"));

   const fetchRevenue = async () => {
      try {
         // console.log(
         //    `api url: ${apiUrl}/data/get-revenue/${user._id}/${props.currentPeriod}`
         // );
         const res = await fetch(
            `${apiUrl}/data/get-revenue/${user._id}/${props.currentPeriod}`
         );

         if (!res.ok) {
            throw new Error("Network was not okay");
         }
         const result = await res.json();

         setRevenueData(result);
      } catch (err) {
         console.error(err);
      }
   };

   const [revenueData, setRevenueData] = useState([
      {
         revenues: [
            {
               rev_amt: "",
               rev_name: "",
               rev_period: "",
               __v: "",
               _id: "",
            },
         ],
      },
      { rev_total: "" },
   ]);

   const [data, setData] = useState({
      labels: [],
      datasets: [
         {
            label: "Revenue",
            backgroundColor: [
               "#B9FBC0",
               "#98F5E1",
               "#8EECF5",
               "#90DBF4",
               "#A3C4F3",
               "#CFBAF0",
               "#F1C0E8",
               "#FFCFD2",
               "#FDE4CF",
               "#FBF8CC",
            ],
            borderColor: "black",

            data: [, 1, 2],
         },
      ],
   });

   useEffect(() => {
      fetchRevenue();
      // console.log("Hit effect fetch");
   }, [props.currentPeriod, props.submitState, props.deleteState]);

   useEffect(() => {
      // console.log("Hit setData");
      // console.log(revenueData);

      const rev = revenueData[0].revenues;
      const amt = rev.map((data) => data.rev_amt);
      const name = rev.map((data) => data.rev_name);
      // console.log(amt);
      // console.log(name);

      setData({
         labels: name,
         datasets: [
            {
               label: "Revenue",
               backgroundColor: [
                  "#B9FBC0",
                  "#98F5E1",
                  "#8EECF5",
                  "#90DBF4",
                  "#A3C4F3",
                  "#CFBAF0",
                  "#F1C0E8",
                  "#FFCFD2",
                  "#FDE4CF",
                  "#FBF8CC",
               ], //["#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001f3f", "#39CCCC", "#01FF70", "#85144b", "#F012BE", "#3D9970", "#111111", "#AAAAAA"], //["#284b63", "blue", "yellow", "purple", "pink"],
               borderColor: "#52575D",
               data: amt,
            },
         ],
      });
   }, [revenueData]);

   // console.log(`rev ${rev}`)
   // console.log(revenueData[0].revenues.length)
   return (
      <div>
         {revenueData[0].revenues.length > 0 ? (
            <div style={{ width: 400 }}>
               <br/>
               <h3>Total Revenue ${props.totalRev}</h3>
               <Pie data={data} options={{}} />
            </div>
         ) : (
            <div> No DATA!</div>
         )}
      </div>
   );
}
