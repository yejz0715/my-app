import React, { useEffect, useState } from "react";
import "./style.scss";
import Sidebar from "../../components/Sidebar";
import { useLocation, useParams } from "react-router-dom";
import { mainApi } from "../../api";
import { chapterType } from "@src/types/components";
import Accordion from "../../components/Accordion";
import Svg from "../../components/Svg";
import Canvas from "../../components/Canvas";
import SelectBox from "../../components/SelectBox";
import CheckBox from "../../components/CheckBox";
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

    const changeDetail = () => {
        if (location.pathname === "/") {
            return <>HI</>;
        }

        if (location.pathname === "/details/A01") {
            return <SelectBox />;
        }
        if (location.pathname === "/details/A02") {
            return <CheckBox />;
        }
        if (location.pathname === "/details/B00") {
            return <Accordion />;
        }
        if (location.pathname === "/details/C01") {
            return <Svg />;
        }
        if (location.pathname === "/details/C02") {
            return <Canvas />;
        }
    };

    useEffect(() => {
        getAllContent();
    }, []);

    return (
        <div className="main-container">
            <Sidebar contents={contents} />
            <main className="main-detail">{changeDetail()}</main>
        </div>
    );
};
export default Main;
