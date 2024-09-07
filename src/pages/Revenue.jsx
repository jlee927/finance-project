import DisplayRevenue from "../components/DisplayRevenue";
import { useEffect, useState } from "react";

export default function Revenue() {
   const user = JSON.parse(localStorage.getItem("user"));
   // console.log(user._id);
   const apiUrl = import.meta.env.VITE_API_BASE_URL;
   const [revenue, setRevenue] = useState({
      //this is user revenue entry
      _id: user._id,
      rev_period: "",
      rev_name: "",
      rev_amt: "",
   });

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

   const [revenueData, setRevenueData] = useState([{}]); //this is revenue data from get requets
   const handleRevenue = (event) => {
      setRevenue((prevFormData) => {
         return {
            ...prevFormData,
            [event.target.name]: event.target.value,
         };
      });

      // console.log(event.target.value)
   };

   const handleSubmit = async (event) => {
      event.preventDefault();

      // console.log(revenue);

      const response = await fetch(`${apiUrl}/data/add-revenue`, {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(revenue),
      });
      const json = await response.json();

      if (!response.ok) {
         console.log(json.error);
      }

      if (response.ok) {
         console.log("Successfull sent");
         console.log("Test: " + revenue.rev_period);

         setRevenue({
            _id: user._id, // Keep user ID intact if needed
            rev_period: "",
            rev_name: "",
            rev_amt: "",
            
         });

         // fetchRevenue();
      }
   };

   useEffect(() => {
      // fetchRevenue();
   }, []);

   // console.log(revenueData);

   function handleDelete(_id) {
      console.log(`Delete!: id ${_id}`);
      fetch(`${apiUrl}/data/delete-revenue/${_id}`, {
         method: "DELETE",
      })
         .then((res) => {
            if (!res.ok) {
               throw new Error("Network was not ok");
            }
         })
         .then(() => {
            // Optionally, refetch or update revenueData to reflect the deletion
            setRevenueData((prevData) =>
               prevData.filter((rev) => rev._id !== _id)
            );
         })
         .catch((err) => {
            console.error("Error deleting item:", err);
         });
   }

   const renderedRevenueData = revenueData.map((rev, key) => {
      return (
         <div key={key}>
            <button type="button" onClick={() => handleDelete(rev._id)}>
               Delete
            </button>
            <h4>
               {rev.rev_name}, {rev.rev_freq}, {rev.rev_amt}
            </h4>
         </div>
      );
   });

   return (
      <div>
         <form
            className="revenue--container"
            onSubmit={handleSubmit}
            method="POST"
         >
            <h1>Revenue</h1>
            <label>Choose Revenue Period</label>
            <input
               name="rev_period"
               onChange={handleRevenue}
               type="month"
               value={revenue.rev_period}
            />
            <br /> <br />
            <label>Type of Revenue</label>
            <input
               name="rev_name"
               onChange={handleRevenue}
               type="text"
               value={revenue.rev_name}
            />
            <br /> <br />
            <label>Revenue * Per Month</label>
            <input
               name="rev_amt"
               onChange={handleRevenue}
               type="number"
               value={revenue.rev_amt}
               min="0.00"
               // step="0.01"
            />
          
            <br /> <br />
            <button>Add Entry</button>
         </form>

         <DisplayRevenue currentPeriod={revenue.rev_period}/>
      </div>
   );
}
