import "../assets/styles/expenses.css";
import DisplayExpenses from "../components/DisplayExpenses";
import Sidebar from "../components/Sidebar";
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
            <Sidebar />
            <div className="expenses--container">
                <form
                    className="form--container"
                    onSubmit={handleSubmit}
                    method="POST"
                >
                    <div className="expenses--period--container">
                        <label>
                            <h1>Choose Expenses Period</h1>
                        </label>
                        <input
                            name="expense_period"
                            onChange={handleExpenses}
                            type="month"
                            value={formData.expense_period}
                        />
                    </div>
                    <div className="amt-and-name">
                        <h2>Add an Expense</h2>
                        <div className="expenses--name--container">
                            <label>Type of Expense*</label>
                            <input
                                name="expense_name"
                                onChange={handleExpenses}
                                type="text"
                                value={formData.expense_name}
                            />
                        </div>

                        <div className="expenses--amt--container">
                            <label>$ Per Month*</label>

                            <input
                                name="expense_amt"
                                onChange={handleExpenses}
                                type="number"
                                value={formData.expense_amt}
                                min="0.00"
                            // step="0.01"
                            />
                        </div>

                        <button>Submit</button>
                    </div>
                </form>

                <DisplayExpenses
                    currentPeriod={formData.expense_period}
                    submitState={submitState}
                />
            </div>
        </div>
    )
}
