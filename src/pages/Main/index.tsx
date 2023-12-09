import React, { useEffect, useState } from "react";
import "./style.scss";
import Sidebar from "../../components/Sidebar";
import { useParams } from "react-router-dom";
import { mainApi } from "../../api";
import { chapterType, selectDataType } from "@src/types/components";
import { componentList } from "../../data/dummy";

/**
 * main page 입니다.
 * @returns {JSX.Element}
 */

const Main = (): JSX.Element => {
    const [contents, setContents] = useState<chapterType[]>([]);
    const { subId } = useParams();

    // 데이터를 가져오는 비동기 함수
    const getAllContent = async (): Promise<void> => {
        try {
            const { data } = await mainApi.getContents();
            setContents(data);
        } catch (error) {
            console.log(error);
        }
    };

    const findComponent = (): JSX.Element => {
        const selectedPath = componentList.find((item) => item.id === subId);
        if (selectedPath === undefined) {
            return (
                <div>
                    <p>main page 입니다.</p>
                    <p>sideBar를 통해 원하는 항목을 클릭해주세요 :)</p>
                </div>
            );
        } else {
            const DetailComponent = selectedPath.component;
            const DetailComponentProps = selectedPath.props;
            return (
                <DetailComponent DetailComponentProps={DetailComponentProps} />
            );
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
