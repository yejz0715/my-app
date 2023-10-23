import React, { useEffect, useState } from "react";
import "./style.scss";
import Sidebar from "../../components/Sidebar";
import { useLocation } from "react-router-dom";
import Details from "../Details";
import { mainApi } from "../../api";
import { chapterType } from "@src/types/sidebar";
const Main = () => {
    const location = useLocation();
    const [contents, setContents] = useState<chapterType[]>([]);
    const getAllContent = async () => {
        try {
            const { data } = await mainApi.getContents();
            setContents(data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getAllContent();
    }, []);
    return (
        <div className="main-container">
            <Sidebar contents={contents} />
            <main className="main-detail">
                {location.pathname === "/" ? <h1>main</h1> : <Details />}
            </main>
        </div>
    );
};

export default Main;
