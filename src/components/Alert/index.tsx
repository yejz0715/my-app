import React, { useState } from "react";
import "./style.scss";
const Alert = () => {
    const [isOpen, setIsOpen] = useState(false);
    const handleOpenAlert = () => {
        setIsOpen(true);
    };
    const handleCloseAlert = () => {
        setIsOpen(false);
    };
    return (
        <div>
            {isOpen && (
                <div className="alert-wrap">
                    <h1 className="alert-title">hi :)</h1>
                    <button onClick={handleCloseAlert} className="close-button">
                        확인
                    </button>
                </div>
            )}
            <button onClick={handleOpenAlert} className="alert-button">
                click
            </button>
        </div>
    );
};

export default Alert;
