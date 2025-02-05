import "../assets/styles/data_overview.css";
import expensesImg from "../assets/images/graph.png";
import revImg from "../assets/images/stats.png";
import savingsImg from "../assets/images/piggy-bank.png";
import spendingsImg from "../assets/images/money2.png";
import { useState, useEffect } from "react";

export default function DataOverview() {
    const apiUrl = import.meta.env.VITE_API_BASE_URL
    const user = JSON.parse(localStorage.getItem("user"))

    const [allCategoriesData, setAllCategoriesData] = useState([]);

    const fetchAllCategories = async () => {
        try {
            const res = await fetch(
                `${apiUrl}/data/get-all-categories/${user._id}`
            )

            const result = await res.json()
            setAllCategoriesData(result)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        fetchAllCategories()
        //  console.log("fetch all categories called")
    }, [])

    // console.log(allCategoriesData)
    return (
        <div className="userdata-overview">
            {/*<div className="overview-component">
                <img className="overview-icon" src={spendingsImg} />
                <div className="overview-text">
                    <h4>Savings Goal</h4>
                    <h2>$0</h2>
                </div>
            </div> */}
            <div className="overview-component">
                {/* <a href="https://www.flaticon.com/free-icons/graphic" title="graphic icons">Graphic icons created by Freepik - Flaticon</a> */}
                <img className="overview-icon" src={revImg} />
                <div className="overview-text">
                    <h4>Your Revenue</h4>
                    <h2>${allCategoriesData[1]}</h2>
                </div>
            </div>

            <div className="overview-component">
                {/* <a href="https://www.flaticon.com/free-icons/graphic" title="graphic icons">Graphic icons created by Freepik - Flaticon</a> */}
                <img className="overview-icon" src={expensesImg} />
                <div className="overview-text">
                    <h4>Your Expenses</h4>
                    <h2>${allCategoriesData[3]}</h2>
                </div>
            </div>

            <div className="overview-component">
                {/* <a href="https://www.flaticon.com/free-icons/graphic" title="graphic icons">Graphic icons created by Freepik - Flaticon</a> */}
                <img className="overview-icon" src={savingsImg} />
                <div className="overview-text">
                    <h4>Your Current Savings</h4>
                    <h2>${allCategoriesData[5]}</h2>
                </div>
            </div>

            {/*
            <div className="overview-component">
                <img className="overview-icon" src={spendingsImg} />
                <div className="overview-text">
                    <h4>Your Spendings</h4>
                    <h2>$placeholder$</h2>
                </div>
            </div>
            */}

        </div>
    )
}
