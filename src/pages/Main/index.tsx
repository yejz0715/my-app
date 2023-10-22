import React from "react";
import "./style.scss";
import Sidebar from "../../components/Sidebar";
import { useLocation } from "react-router-dom";
import Details from "../Details";
const Main = () => {
    const location = useLocation();
    console.log(location.pathname);
    return (
        <div className="main-container">
            <Sidebar />
            <main className="main-detail">
                {location.pathname === "/" ? <h1>main</h1> : <Details />}
            </main>
        </div>
    );
};

export default Main;
