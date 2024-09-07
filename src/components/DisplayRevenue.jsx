import { useEffect, useState } from "react";

export default function DisplayRevenue(props) {
   const apiUrl = import.meta.env.VITE_API_BASE_URL;
   const user = JSON.parse(localStorage.getItem("user"));

   const dynamicTest = props.currentPeriod;

   const fetchRevenue = async () => {
      try {
         const res = await fetch(`${apiUrl}/data/get-revenue/${user._id}`);

         if (!res.ok) {
            throw new Error("Network was not okay");
         }
         const result = await res.json();

         setRevenueData(result);
      } catch (err) {
         console.error(err);
      }
   };

   const [revenueData, setRevenueData] = useState([{}]);

   useEffect(() => {
      console.log(`${apiUrl}/data/get-revenue/${user._id}`);
      fetchRevenue();
   }, [props.currentPeriod]);

   const renderedRevenueData = revenueData.map((rev, key) => {
      return (
         <div key={key}>
            <button type="button" onClick={() => handleDelete(rev._id)}>
               Delete
            </button>
            <h4>
               {rev.rev_name}, {rev.rev_period}, {rev.rev_amt}
            </h4>
         </div>
      );
   });

   return (
      <div>
         <h1>Display Rev Test</h1>
         <h2>{dynamicTest}</h2>
         <div>{renderedRevenueData}</div>
      </div>
   );
}
