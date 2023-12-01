import React, { useEffect } from "react";

/**
 * Svg component 입니다.
 * @returns {JSX.Element}
 */
const Svg = (): JSX.Element => {
    //   클릭 이벤트 함수_선택한 버튼의 텍스트 내용을 나타내고, 음성으로 읽어줍니다.
    const handleOnclick = (num: number): void => {
        const numText = document.querySelector("#num");
        if (!numText) return;
        numText.textContent = `${num}`;

        let utterance = new SpeechSynthesisUtterance(`${num}`);
        speechSynthesis.speak(utterance);
    };

    //   1-9번 버튼에 이벤트를 추가하는 함수
    const setEventListener = (): void => {
        const buttons = document.querySelectorAll(".num-button");

        if (!buttons) return;

        for (let i = 1; i <= 9; i++) {
            const button = buttons[i - 1] as HTMLElement;
            button.addEventListener("click", () => handleOnclick(i));
        }
    };
    useEffect((): void => {
        setEventListener();
    }, []);
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1024 768"
            width="1024"
            height="768"
        >
            <path d="M0 0 H 1024 V 768 H 0 L 0 0" fill="white" />
            <g id="num-text">
                <circle cx="200" cy="380" r="90" fill="#167C80" />
                <text
                    id="num"
                    x="171"
                    y="417"
                    fontSize="100"
                    fill="white"
                ></text>
                {/* <!-- 번호판 --> */}
                <g id="num-box" transform="translate(70,110)">
                    {/* <!-- 1 --> */}
                    <g className="num-button">
                        <rect
                            x="450"
                            y="100"
                            width="120"
                            height="120"
                            fill="none"
                            stroke="black"
                            rx="20"
                            ry="20"
                        ></rect>
                        <text
                            x="490"
                            y="185"
                            fontSize="70"
                            fill="#167C80"
                            cursor="pointer"
                        >
                            1
                        </text>
                    </g>
                    {/* <!-- 2 --> */}
                    <g className="num-button">
                        <rect
                            x="570"
                            y="100"
                            width="120"
                            height="120"
                            fill="none"
                            stroke="black"
                            rx="20"
                            ry="20"
                        ></rect>
                        <text
                            x="610"
                            y="185"
                            fontSize="70"
                            fill="#167C80"
                            cursor="pointer"
                        >
                            2
                        </text>
                    </g>
                    {/* <!-- 3 --> */}
                    <g className="num-button">
                        <rect
                            x="690"
                            y="100"
                            width="120"
                            height="120"
                            fill="none"
                            stroke="black"
                            rx="20"
                            ry="20"
                        ></rect>
                        <text
                            x="730"
                            y="185"
                            fontSize="70"
                            fill="#167C80"
                            cursor="pointer"
                        >
                            3
                        </text>
                    </g>

                    {/* <!-- 4 --> */}
                    <g className="num-button">
                        <rect
                            x="450"
                            y="220"
                            width="120"
                            height="120"
                            fill="none"
                            stroke="black"
                            rx="20"
                            ry="20"
                        ></rect>
                        <text
                            x="490"
                            y="305"
                            fontSize="70"
                            fill="#167C80"
                            cursor="pointer"
                        >
                            4
                        </text>
                    </g>
                    {/* <!-- 5 --> */}
                    <g className="num-button">
                        <rect
                            x="570"
                            y="220"
                            width="120"
                            height="120"
                            fill="none"
                            stroke="black"
                            rx="20"
                            ry="20"
                        ></rect>
                        <text
                            x="610"
                            y="305"
                            fontSize="70"
                            fill="#167C80"
                            cursor="pointer"
                        >
                            5
                        </text>
                    </g>
                    {/* <!-- 6 --> */}
                    <g className="num-button">
                        <rect
                            x="690"
                            y="220"
                            width="120"
                            height="120"
                            fill="none"
                            stroke="black"
                            rx="20"
                            ry="20"
                        ></rect>
                        <text
                            x="730"
                            y="305"
                            fontSize="70"
                            fill="#167C80"
                            cursor="pointer"
                        >
                            6
                        </text>
                    </g>
                    {/* <!-- 7 --> */}
                    <g className="num-button">
                        <rect
                            x="450"
                            y="340"
                            width="120"
                            height="120"
                            fill="none"
                            stroke="black"
                            rx="20"
                            ry="20"
                        ></rect>
                        <text
                            x="490"
                            y="425"
                            fontSize="70"
                            fill="#167C80"
                            cursor="pointer"
                        >
                            7
                        </text>
                    </g>
                    {/* <!-- 8 --> */}
                    <g className="num-button">
                        <rect
                            x="570"
                            y="340"
                            width="120"
                            height="120"
                            fill="none"
                            stroke="black"
                            rx="20"
                            ry="20"
                        ></rect>
                        <text
                            x="610"
                            y="425"
                            fontSize="70"
                            fill="#167C80"
                            cursor="pointer"
                        >
                            8
                        </text>
                    </g>
                    {/* <!-- 9 --> */}
                    <g className="num-button">
                        <rect
                            x="690"
                            y="340"
                            width="120"
                            height="120"
                            fill="none"
                            stroke="black"
                            rx="20"
                            ry="20"
                        ></rect>
                        <text
                            x="730"
                            y="425"
                            fontSize="70"
                            fill="#167C80"
                            cursor="pointer"
                        >
                            9
                        </text>
                    </g>
                </g>
            </g>
        </svg>
    );
};
export default Svg;
