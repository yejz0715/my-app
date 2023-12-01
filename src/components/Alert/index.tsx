import React, { useEffect, useState } from "react";
import "./style.scss";
import classNames from "classnames";

/**
 * Alert component 입니다.
 * @returns {JSX.Element}
 */
const Alert = (): JSX.Element => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleOpenAlert = (): void => {
        setIsOpen(true);
    };

    const handleCloseAlert = (): void => {
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
