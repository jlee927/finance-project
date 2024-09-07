export default function Expenses() {

    const handleExpense = async () => {

    }

    const handleSubmit = async () => {

    }

    return (
        <div>
            <h1>Expenses</h1>

            <form className="expenses--container" onSubmit={handleSubmit}>
            <label>Expense Name</label>
            <input 
                type="text"
                name="expense_name"
                onClick={handleExpense} 
            />

            <button>Add Entry</button>
            <label>Expense Amount</label>
            <input 
                type="text"
                name="expense_amt"
                onClick={handleExpense}
            />

            <label>Expense Frequency</label>
            <input
                type="text"
                name="expense_freq"
                onClick={handleExpense}
            />
         </form>
        </div>
    )
}