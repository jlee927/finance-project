import Sidebar from "../components/Sidebar";
import DisplaySpendings from "../components/DisplaySpendings";
import "../assets/styles/expenses.css";
import { useState } from "react";

export default function Spendings() {
   const apiUrl = import.meta.env.VITE_API_BASE_URL
   const user = JSON.parse(localStorage.getItem("user"))
   const date = new Date()
   let month = date.getMonth() + 1
   month = month <= 9 ? `0${month}` : month

   const currPeriod = `${date.getFullYear()}-${month}`

   const [formData, setFormData] = useState({
      _id: user._id,
      spending_period: currPeriod,
      spending_name: "",
      spending_amt: "",
   })

   const [submitState, setSubmitState] = useState(true)
   const handleSubmit = async (event) => {
      event.preventDefault()

      // console.log(formData)
      const response = await fetch(`${apiUrl}/data/post-spending`, {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(formData),
      })
      const json = await response.json()

      if (!response.ok) {
         console.log(json.error)
      }

      if (response.ok) {
         // console.log("Successfull sent")

         setFormData({
            _id: user._id, // Keep user ID intact if needed
            spending_period: formData.spending_period,
            spending_name: "",
            spending_amt: "",
         })
      }
      setSubmitState(!submitState)
   }

   const handleSpending = (event) => {
      setFormData((prevFormData) => {
         return {
            ...prevFormData,
            [event.target.name]: event.target.value,
         }
      })
   }

   return (
      <div>
         <Sidebar />
         <div className="expenses--container">
            <form
               className="form--container"
               onSubmit={handleSubmit}
               method="POST"
            >
               <div className="expenses--period--container">
                  <label>
                     <h1>Choose Spending Period</h1>
                  </label>
                  <input
                     name="spending_period"
                     onChange={handleSpending}
                     type="month"
                     value={formData.spending_period}
                  />
               </div>
               <div className="amt-and-name">
                  <h2>Add a Spending</h2>
                  <div className="expenses--name--container">
                     <label>Type of Spending*</label>
                     <input
                        name="spending_name"
                        onChange={handleSpending}
                        type="text"
                        value={formData.spending_name}
                     />
                  </div>

                  <div className="expenses--amt--container">
                     <label>$ Spent</label>

                     <input
                        name="spending_amt"
                        onChange={handleSpending}
                        type="number"
                        value={formData.spending_amt}
                        min="0.00"
                     // step="0.01"
                     />
                  </div>
                  <button>Submit</button>
               </div>
            </form>
            <DisplaySpendings
               currentPeriod={formData.spending_period}
               submitState={submitState}
            />
         </div>
      </div>
   )
}
