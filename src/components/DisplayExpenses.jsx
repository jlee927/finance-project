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
        // console.log("fetched")
        // console.log(expensesData)
    }, [props.currentPeriod, props.submitState])

    const [deleteState, setDeleteState] = useState(true)
    function handleDelete(_id) {
        // console.log(`Delete!: id ${_id}`)
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
            <tr key={key}>
                <td>{expense.expense_name}</td>
                <td>${expense.expense_amt}</td>
                <td>{expense.expense_period}</td>
                <td>
                    <button
                        className="expenses--delete"
                        type="button"
                        onClick={() => {
                            handleDelete(expense._id)
                        }}
                    >
                        Click
                    </button>
                </td>
            </tr>
        )
    })

    return (
        <div className="expenses--result--container">
            <h2>Monthly Expenses</h2>
            <table>
                <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Amount</th>
                        <th>Rev Period</th>
                        <th>Delete!</th>
                    </tr>
                    {expensesData[0].expenses == 0 ? (
                        <tr>
                            <td>n/a</td>
                            <td>n/a</td>
                            <td>n/a</td>
                            <td>n/a</td>
                        </tr>
                    ) : (
                        renderedExpenses
                    )}
                </tbody>
            </table>

            <PieChart expensesData={expensesData} />
        </div>
    )
}
