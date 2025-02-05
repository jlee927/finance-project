import "../assets/styles/dashboard.css"
import Bargraph from "../components/BarGraph"
import DataOverview from "../components/DataOverview"
import LineChart from "../components/LineChart"
import Sidebar from "../components/Sidebar"

// TODO delete this as well
const user = JSON.parse(localStorage.getItem("user"))

export default function Dashboard() {
    return (
        <div>
            <Sidebar />
            <DataOverview />
            <div className="dashboard--container">
                <div className="dashboard--message">
                    <h1>Welcome to Your Dashboard!</h1>
                </div>

                <div className="all-data">
                    <div className="graph">
                        <Bargraph />
                    </div>
                </div>
                <div style={{ margin: "9em 0 0 0", border: "solid white 1px" }} />
                {/*
                <div className="disposable--container">
                    <h2>Your Calculated Budget</h2>
                    <LineChart />
                </div>
                    */}

                {/* todo delete this */}
            </div>
        </div>
    )
}
