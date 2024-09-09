import DisplayRevenue from "../components/DisplayRevenue";
import { useEffect, useState } from "react";

export default function Revenue() {
   const user = JSON.parse(localStorage.getItem("user"));
   // console.log(user._id);

   const date = new Date();
   let month = date.getMonth() + 1;
   month = month <= 9 ? `0${month}` : month;

   const currPeriod = `${date.getFullYear()}-${month}`;

   const apiUrl = import.meta.env.VITE_API_BASE_URL;
   const [revenue, setRevenue] = useState({
      //this is user revenue entry
      _id: user._id,
      rev_period: currPeriod,
      rev_name: "",
      rev_amt: "",
   });

   const handleRevenue = (event) => {
      setRevenue((prevFormData) => {
         return {
            ...prevFormData,
            [event.target.name]: event.target.value,
         };
      });

      // console.log(event.target.value)
   };

   const [submit, setSubmit] = useState(true)

   const handleSubmit = async (event) => {
      event.preventDefault();

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
         // console.log("Test: " + revenue.rev_period);

         setRevenue({
            _id: user._id, // Keep user ID intact if needed
            rev_period: revenue.rev_period,
            rev_name: "",
            rev_amt: "",
            
         });
      }
      setSubmit(!submit)
   };

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
            <label>$ Per Month</label>
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

         <DisplayRevenue currentPeriod={revenue.rev_period} submitState={submit}/>
         <br/>
      </div>
   );
}
