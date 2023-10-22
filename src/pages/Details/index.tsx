import React from "react";
import { useParams } from "react-router-dom";

const Details = () => {
    const param = useParams();
    console.log(param.subId);
    return (
        <>
            <h1>detail</h1>
        </>
    );
};
export default Details;
