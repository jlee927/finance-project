import PieChart from "./RevPieChart"
import { useEffect, useState } from "react"

export default function DisplayRevenue(props) {
    const apiUrl = import.meta.env.VITE_API_BASE_URL
    const user = JSON.parse(localStorage.getItem("user"))

    const fetchRevenue = async () => {
        try {
            const res = await fetch(
                `${apiUrl}/data/get-revenue/${user._id}/${props.currentPeriod}`
            )

            if (!res.ok) {
                throw new Error("Network was not okay")
            }
            const result = await res.json()

            setRevenueData(result)
        } catch (err) {
            console.error(err)
        }
    }

    let [revenueData, setRevenueData] = useState([])

    useEffect(() => {
        fetchRevenue()
        console.log("fetch called!")
    }, [props.currentPeriod, props.submitState])

    //   console.log(revenueData[0]);
    const rev = revenueData.length > 0 ? revenueData[0].revenues : []
    const total = revenueData.length > 0 ? revenueData[1].rev_total : []
    //    console.log("Test", revenueData[1]);
    const renderedRevenueData = rev.map((rev, key) => {
        return (
            <div key={key}>
                <h4>
                    <button type="button" onClick={() => handleDelete(rev._id)}>
                        Delete
                    </button>{" "}
                    : {}
                    {rev.rev_name}: ${rev.rev_amt} ({rev.rev_period})
                </h4>
            </div>
        )
    })

    const [deleteState, setDeleteState] = useState(true)
    function handleDelete(_id) {
        console.log(`Delete!: id ${_id}`)
        fetch(`${apiUrl}/data/delete-revenue/${_id}`, {
            method: "DELETE",
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Network was not ok")
                }
            })
            .then(() => {
                // Optionally, refetch or update revenueData to reflect the deletion
                setRevenueData((prevData) =>
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
        <div>
            <br></br>
            <h2>Monthly Income</h2>
            {/* <h2>{dynamicTest}</h2> */}
            <div>{renderedRevenueData}</div>

            {/* <h4>Total Revenue: ${total}</h4> */}
            <PieChart
                currentPeriod={props.currentPeriod}
                submitState={props.submitState}
                deleteState={deleteState}
                totalRev={total}
            />
        </div>
    )
}
