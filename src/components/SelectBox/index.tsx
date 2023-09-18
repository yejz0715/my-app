import React, { useState } from "react";
import classNames from "classnames";
import "./style.scss";

const data = [
    { id: 1, text: "하나", value: "one" },
    { id: 2, text: "둘", value: "two" },
    { id: 3, text: "셋", value: "three" },
];
const SelectBox = () => {
    const [state, setState] = useState(false);
    const [selectedValue, setSelectedValue] = useState({
        text: "선택",
        value: "",
    });
    const handleClick = () => {
        setState((prev) => !prev);
    };
    const handleSelect = (e: React.MouseEvent<HTMLElement>) => {
        const target = e.target as HTMLElement;
        const text = target.innerHTML;
        const value = target.getAttribute("value");
        if (!value) {
            return;
        }
        setSelectedValue({ text, value });
    };

    return (
        <div className="select-container" onClick={handleClick}>
            <label className="selector">{selectedValue.text}</label>
            <ul
                className={classNames("options", state && "open")}
                onClick={handleSelect}
            >
                {data.map((item) => (
                    <li
                        key={item.id}
                        className={
                            item.text === selectedValue.text
                                ? "selectorOption"
                                : "option"
                        }
                        value={item.value}
                    >
                        {item.text}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SelectBox;
