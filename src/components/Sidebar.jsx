import "../assets/styles/sidebar.css";
import moneyIcon from "../assets/images/money-icon2.png";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
    return (
        <div className="sidebar">
            <div className="category--container">
                <div className="category">
                    <img src={moneyIcon} className="money--img" />
                    <h4>CATEGORIES</h4>
                </div>

                <div className="sidebar-navs">
                    <NavLink to="/dashboard">Dashboard</NavLink>
                    <NavLink to="/revenue">Revenue</NavLink>
                    <NavLink to="/expenses">Expenses</NavLink>
                    <NavLink to="/savings">Savings</NavLink>
                    <NavLink to="/spendings">Spendings</NavLink>
                </div>
            </div>
        </div>
    )
}
