export default function AddEntry() {
   const handleSubmit = async (e) => {
      e.preventDefault();

      console.log("Submit!");
   };

   return (
      <div>
         <form className="revenue--container" onSubmit={handleSubmit}>
            <label>Revenue</label>
            <input />
            <button>Add Entry</button>
         </form>

         <form className="expenses--container" onSubmit={handleSubmit}>
            <label>Expenses</label>
            <input />
            <button>Add Entry</button>
         </form>

         <form className="savings--container" onSubmit={handleSubmit}>
            <label>Savings</label>
            <input />
            <button>Add Entry</button>
         </form>

        
      </div>
   );
}
