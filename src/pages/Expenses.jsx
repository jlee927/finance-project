import DisplayExpenses from "../components/DisplayExpenses";
import { useState } from "react";

export default function Expenses() {
    const apiUrl = import.meta.env.VITE_API_BASE_URL
    const user = JSON.parse(localStorage.getItem("user"))
    const date = new Date()
    let month = date.getMonth() + 1
    month = month <= 9 ? `0${month}` : month

    const currPeriod = `${date.getFullYear()}-${month}`

    const [formData, setFormData] = useState({
        _id: user._id,
        expense_period: currPeriod,
        expense_name: "",
        expense_amt: "",
    })

    const [submitState, setSubmitState] = useState(true)
    const handleSubmit = async (event) => {
        event.preventDefault()

        console.log(formData)
        const response = await fetch(`${apiUrl}/data/post-expense`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        })
        const json = await response.json()

        if (!response.ok) {
            console.log(json.error)
        }

        if (response.ok) {
            console.log("Successfull sent")

            setFormData({
                _id: user._id, // Keep user ID intact if needed
                expense_period: formData.expense_period,
                expense_name: "",
                expense_amt: "",
            })
        }
        setSubmitState(!submitState)
    }

    const handleExpenses = (event) => {
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                [event.target.name]: event.target.value,
            }
        })
    }

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

            <DisplayExpenses currentPeriod={formData.expense_period} submitState={submitState} />
        </div>
    )
}
