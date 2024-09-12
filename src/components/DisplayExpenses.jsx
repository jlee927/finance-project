import PieChart from "./ExpensePie";
import { useEffect, useState } from "react";

export default function DisplayExpenses(props) {
    const apiUrl = import.meta.env.VITE_API_BASE_URL
    const user = JSON.parse(localStorage.getItem("user"))

    const [expensesData, setExpensesData] = useState([
        {
            expenses: [
                {
                    _id: "",
                    expense_period: "",
                    expense_name: "",
                    expense_amt: "",
                },
            ],
        },
        {
            totalExpenses: "",
        },
    ])

    const fetchRevenue = async () => {
        try {
            const res = await fetch(
                `${apiUrl}/data/get-expenses/${user._id}/${props.currentPeriod}`
            )

            if (!res.ok) {
                throw new Error("Network was not okay")
            }
            const result = await res.json()

            setExpensesData(result)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        fetchRevenue()
        console.log("fetched")
        console.log(expensesData)
    }, [props.currentPeriod, props.submitState])

    const [deleteState, setDeleteState] = useState(true)
    function handleDelete(_id) {
        console.log(`Delete!: id ${_id}`)
        fetch(`${apiUrl}/data/delete-expense/${_id}`, {
            method: "DELETE",
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Network was not ok")
                }
            })
            .then(() => {
                // Optionally, refetch or update revenueData to reflect the deletion
                setExpensesData((prevData) =>
                    prevData.filter((rev) => rev._id !== _id)
                )
            })
            .catch((err) => {
                console.error("Error deleting item:", err)
            })

        fetchRevenue()
        setDeleteState(!deleteState)
    }

    const renderedExpenses = expensesData[0].expenses.map((expense, key) => {
        return (
            <div key={key}>
                <h4>
                    <button
                        type="button"
                        onClick={() => {
                            handleDelete(expense._id)
                        }}
                    >
                        Delete!
                    </button>
                    {expense.expense_name}: ${expense.expense_amt} (
                    {expense.expense_period})
                </h4>
            </div>
        )
    })

    return (
        <div>
            <h2>Monthly Expenses</h2>
            <div>{renderedExpenses}</div>

            <PieChart expensesData={expensesData}/>
        </div>
    )
}
