import React, { useState } from "react";
import classNames from "classnames";
import "./style.scss";
import { selectDataType } from "@src/types/components";

/**
 * selectBox component 입니다.
 * @param {selectDataType} data selectBox의 옵션목록
 * @returns {JSX.Element}
 */
const SelectBox = ({ data }: selectDataType): JSX.Element => {
    const [state, setState] = useState<boolean>(false);
    const [selectedValue, setSelectedValue] = useState<{
        text: string;
        value: string;
    }>({
        text: "선택",
        value: "",
    });

    const handleClick = (): void => {
        setState((prev) => !prev);
    };

    //클릭 이벤트 함수_선택한 요소의 text와 value를 가져옵니다.
    const handleSelect = (e: React.MouseEvent<HTMLElement>): void => {
        const target = e.target as HTMLElement;
        const text = target.innerHTML;
        const value = target.getAttribute("value");
        if (!value) return;

        setSelectedValue({ text, value });
    };

    return (
        <div className="select-container" onClick={handleClick}>
            <label className="selector">{selectedValue.text}</label>
            <ul
                className={classNames("options", state && "open")}
                onClick={handleSelect}
            >
                {data &&
                    data.map((item: { [id: string]: any }) => (
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
