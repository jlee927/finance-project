import { useEffect, useState } from "react";

export default function DisplaySpendings(props) {
    const user = JSON.parse(localStorage.getItem("user"))
    const apiUrl = import.meta.env.VITE_API_BASE_URL
    const [spendingData, setSpendingData] = useState([
        {
            spendings: [
                {
                    _id: "",
                    spending_period: "",
                    spending_name: "",
                    spending_amt: "",
                },
            ],
        },
        { totalSpending: "" },
    ])

    const fetchRevenue = async () => {
        try {
            const res = await fetch(
                `${apiUrl}/data/get-spendings/${user._id}/${props.currentPeriod}`
            )

            if (!res.ok) {
                throw new Error("Network was not okay")
            }
            const result = await res.json()

            setSpendingData(result)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        fetchRevenue()
    }, [props.currentPeriod, props.submitState])

    const renderedSpendings = spendingData[0].spendings.map((spendings, key) => {
        return (
            <tr key={key}>
                <td>{spendings.spending_name}</td>
                <td>${spendings.spending_amt}</td>
                <td>{spendings.spending_period}</td>
                <td>
                    <button type="button" className="savings--delete" onClick={() => handleDelete(spendings._id)}>Click</button>
                </td>
            </tr>
        )
    })

    const [deleteState, setDeleteState] = useState(true)
    function handleDelete(_id) {
        // console.log(`Delete!: id ${_id}`)
        fetch(`${apiUrl}/data/delete-spending/${_id}`, {
            method: "DELETE",
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Network was not ok")
                }
            })
            .then(() => {
                // Optionally, refetch or update revenueData to reflect the deletion
                setSpendingData((prevData) =>
                    prevData.filter((rev) => rev._id !== _id)
                )
            })
            .catch((err) => {
                console.error("Error deleting item:", err)
            })

        fetchRevenue()
        setDeleteState(!deleteState)
    }
    return (
        <div className="savings--result--container">
            <h2>Spendings During {props.currentPeriod}</h2>
            <table>
                <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Amount</th>
                        <th>Rev Period</th>
                        <th>Delete!</th>
                    </tr>
                    {spendingData[0].spendings.length == 0 ? (
                        <tr>
                            <td>n/a</td>
                            <td>n/a</td>
                            <td>n/a</td>
                            <td>n/a</td>
                        </tr>
                    ) : (
                        renderedSpendings
                    )}
                </tbody>
            </table>
            {/*<PieChart spendingsData={spendingData} />*/}
        </div>

    )
}
