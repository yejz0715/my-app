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
        if (!isOpen) return;
        const timeOut = setTimeout(() => {
            setIsOpen(false);
        }, 3000);

        return () => {
            clearTimeout(timeOut);
        };
    }, [isOpen]);
    return (
        <div>
            <div className={classNames("alert-wrap", isOpen && "open-alert")}>
                <h1 className="alert-title">Hi there! Have a great day! :)</h1>
                <button onClick={handleCloseAlert} className="close-button">
                    확인
                </button>
            </div>
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
