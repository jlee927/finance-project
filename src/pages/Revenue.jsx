import { useEffect, useState } from "react";

export default function Revenue() {
   const user = JSON.parse(localStorage.getItem("user"));
   // console.log(user._id);
   const apiUrl = import.meta.env.VITE_API_BASE_URL;
   const [revenue, setRevenue] = useState({
      //this is user revenue entry
      _id: user._id,
      rev_name: "",
      rev_amt: "",
      rev_freq: "",
      rev_date: ""
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
         console.log("Test: " + revenue.rev_date)

         setRevenue({
            _id: user._id, // Keep user ID intact if needed
            rev_name: "",
            rev_amt: "",
            rev_freq: "",
            rev_date: "",
         });

         fetchRevenue();
      }
   };

   useEffect(() => {
      fetchRevenue();
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

            <label>Revenue Name</label>
            <input
               name="rev_name"
               onChange={handleRevenue}
               type="text"
               value={revenue.rev_name}
            />

            <label>Revenue Amount</label>
            <input
               name="rev_amt"
               onChange={handleRevenue}
               type="text"
               value={revenue.rev_amt}
            />

            <label>Revenue Frequency</label>
            <input
               name="rev_freq"
               onChange={handleRevenue}
               type="text"
               value={revenue.rev_freq}
            />
            <input 
               name="rev_date"
               onChange={handleRevenue}
               type="date"
               value={revenue.rev_date}
            />

            <button>Add Entry</button>

            <div className="rev--data">{renderedRevenueData}</div>
         </form>

         {/* <form className="expenses--container" onSubmit={handleSubmit}>
            <label>Expenses</label>
            <input />
            <button>Add Entry</button>
         </form>

         <form className="savings--container" onSubmit={handleSubmit}>
            <label>Savings</label>
            <input />
            <button>Add Entry</button>
         </form> */}
      </div>
   );
}
