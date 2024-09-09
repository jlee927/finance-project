import { useState } from "react";

export default function Expenses() {
   const user = JSON.parse(localStorage.getItem("user"));
   const date = new Date();
   let month = date.getMonth() + 1;
   month = month <= 9 ? `0${month}` : month;

   const currPeriod = `${date.getFullYear()}-${month}`;

   const [formData, setFormData] = useState({
      _id: user._id,
      expense_period: currPeriod,
      expense_name: "",
      expense_amt: "",
   });

   const handleSubmit = async (event) => {
      event.preventDefault();

      console.log(formData);
      // const response = await fetch(`${apiUrl}/data/add-revenue`, {
      //    method: "POST",
      //    headers: { "Content-Type": "application/json" },
      //    body: JSON.stringify(revenue),
      // });
      // const json = await response.json();

      // if (!response.ok) {
      //    console.log(json.error);
      // }

      //   if (response.ok) {
      //      console.log("Successfull sent");
      //      console.log("Test: " + revenue.rev_period);
      //      console.log(formData.expenses_period);

      setFormData({
         _id: user._id, // Keep user ID intact if needed
         expense_period: formData.expense_period,
         expense_name: "",
         expense_amt: "",
      });
      //   }
   };

   const handleExpenses = (event) => {
      setFormData((prevFormData) => {
         return {
            ...prevFormData,
            [event.target.name]: event.target.value,
         };
      });
   };

   return (
      <div>
         <form
            className="expenses--container"
            onSubmit={handleSubmit}
            method="POST"
         >
            <h1>Expenses</h1>
            <label>Choose Expense Period</label>
            <input
               name="expense_period"
               onChange={handleExpenses}
               type="month"
               value={formData.expense_period}
            />
            <br /> <br />
            <label>Type of Expense</label>
            <input
               name="expense_name"
               onChange={handleExpenses}
               type="text"
               value={formData.expense_name}
            />
            <br /> <br />
            <label>$ Per Month</label>
            <input
               name="expense_amt"
               onChange={handleExpenses}
               type="number"
               value={formData.expense_amt}
               min="0.00"
               // step="0.01"
            />
            <br /> <br />
            <button>Add Entry</button>
         </form>
      </div>
   );
}
