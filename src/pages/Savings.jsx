import "../assets/styles/savings.css";
import DisplaySavings from "../components/DisplaySavings";
import Sidebar from "../components/Sidebar";
import { useState } from "react";

export default function Savings() {
    const date = new Date()
    let month = date.getMonth() + 1
    month = month <= 9 ? `0${month}` : month

    const apiUrl = import.meta.env.VITE_API_BASE_URL
    const currPeriod = `${date.getFullYear()}-${month}`
    const user = JSON.parse(localStorage.getItem("user"))

    const [savingsData, setSavingsData] = useState({
        _id: user._id,
        savings_period: currPeriod,
        savings_name: "",
        savings_amt: "",
    })

    const [submitState, setSubmitState] = useState(true)
    const handleSubmit = async (event) => {
        event.preventDefault()

        console.log(savingsData)
        const response = await fetch(`${apiUrl}/data/add-savings`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(savingsData),
        })
        const json = await response.json()

        if (!response.ok) {
            console.log(json.error)
        }

        if (response.ok) {
            console.log("Successfull sent")

            setSavingsData({
                _id: user._id, // Keep user ID intact if needed
                savings_period: savingsData.savings_period,
                savings_name: "",
                savings_amt: "",
            })
        }

        setSubmitState(!submitState)
    }

    const handleSavings = (event) => {
        setSavingsData((prevSavingsData) => {
            return {
                ...prevSavingsData,
                [event.target.name]: event.target.value,
            }
        })
    }

    // console.log(savingsData)

    return (
        <div>
            <Sidebar />
            <div className="savings--container">
                <form
                    className="form--container"
                    onSubmit={handleSubmit}
                    method="POST"
                >
                    <div className="savings--period--container">
                        <label>
                            <h1>Choose Savings Period</h1>
                        </label>
                        <input
                            name="savings_period"
                            onChange={handleSavings}
                            type="month"
                            value={savingsData.savings_period}
                        />
                    </div>
                    <div className="amt-and-name">
                        <h2>Add Savings</h2>
                        <div className="savings--name--container">
                            <label>Type of Savings</label>
                            <input
                                name="savings_name"
                                onChange={handleSavings}
                                type="text"
                                value={savingsData.savings_name}
                            />
                        </div>

                        <div className="savings--amt--container">
                            <label>$ Saved</label>
                            <input
                                name="savings_amt"
                                onChange={handleSavings}
                                type="number"
                                value={savingsData.savings_amt}
                                min="0.00"
                            />
                        </div>
                        <button>Submit</button>
                    </div>
                </form>

                <DisplaySavings
                    currentPeriod={savingsData.savings_period}
                    submitState={submitState}
                />
            </div>
        </div>
    )
}
