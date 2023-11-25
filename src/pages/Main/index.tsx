import React, { useEffect, useState } from "react";
import "./style.scss";
import Sidebar from "../../components/Sidebar";
import { useParams } from "react-router-dom";
import { mainApi } from "../../api";
import { chapterType, pathType } from "@src/types/components";
import { pathName } from "../../data/dummy";
const Main = () => {
    const [contents, setContents] = useState<chapterType[]>([]);
    const { subId } = useParams();
    const getAllContent = async () => {
        try {
            const { data } = await mainApi.getContents();
            setContents(data);
        } catch (error) {
            console.log(error);
        }
    };

    const findComponent = () => {
        const selectedPath = pathName.find((item) => item.id === subId);
        if (selectedPath === undefined) {
            return <div>hi</div>;
        } else {
            const DetailComponent = selectedPath.component;
            return <DetailComponent />;
        }
    };

    useEffect(() => {
        getAllContent();
    }, []);

    return (
        <div className="main-container">
            <Sidebar contents={contents} />
            <main className="main-detail">{findComponent()}</main>
        </div>
    );
};
export default Main;
