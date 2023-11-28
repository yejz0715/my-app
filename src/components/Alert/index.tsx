import React, { useEffect, useState } from "react";
import "./style.scss";
import classNames from "classnames";
const Alert = () => {
    const [isOpen, setIsOpen] = useState(false);
    const handleOpenAlert = () => {
        setIsOpen(true);
    };
    const handleCloseAlert = () => {
        setIsOpen(false);
    };
    useEffect(() => {
        const time = setTimeout(() => {
            console.log("5초지남");
            setIsOpen(false);
        }, 5000);

        return () => {
            clearTimeout(time);
        };
    }, [isOpen]);
    return (
        <div>
            {isOpen && (
                <div className={classNames(isOpen ? "alert-wrap" : "alert")}>
                    <h1 className="alert-title">
                        Hi there! Have a great day! :)
                    </h1>
                    <button onClick={handleCloseAlert} className="close-button">
                        확인
                    </button>
                </div>
            )}
            <button
                onClick={handleOpenAlert}
                className={classNames(
                    "alert-button",
                    isOpen && "clicked-alert-button"
                )}
            >
                click
            </button>
        </div>
    );
};

export default Alert;
