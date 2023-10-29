import React, { useEffect, useState } from "react";
import "./style.scss";
import Sidebar from "../../components/Sidebar";
import { useLocation, useParams } from "react-router-dom";
import { mainApi } from "../../api";
import { chapterType } from "@src/types/sidebar";
import Accordion from "../../components/Accordion";
import DefaultSelect from "../../components/Select/DefaultSelect";
import InputSelect from "../../components/Select/InputSelect";
import CheckBoxSelect from "../../components/Select/CheckBoxSelect";
const Main = () => {
    const location = useLocation();
    const param = useParams();
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

    const changeDetail = () => {
        if (location.pathname === "/") {
            return (
                <>
                    <h1>main</h1>
                    <Accordion />
                </>
            );
        }

        if (location.pathname === "/details/a01") {
            return <DefaultSelect />;
        }
        if (location.pathname === "/details/a02") {
            return <CheckBoxSelect />;
        }
        if (location.pathname === "/details/a03") {
            return <InputSelect />;
        }
    };

    return (
        <div className="main-container">
            <Sidebar contents={contents} />
            <main className="main-detail">{changeDetail()}</main>
        </div>
    );
};
export default Main;
