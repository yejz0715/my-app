import React, { useState } from "react";
import "./style.scss";
import { cards } from "../../data/dummy";

/**
    Accordion component 입니다.
 * @returns  {JSX.Element}
 */
const Accordion = (): JSX.Element => {
    const [active, setActive] = useState<number>(0);

    // 선택한 색상 코드를 복사하는 함수
    const copyOnClick = async (text: string): Promise<void> => {
        try {
            await navigator.clipboard.writeText(`${text}`);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="accordion-container">
            <section className="accordion-warp">
                {cards &&
                    cards.map((item, index) => (
                        <article
                            key={index}
                            onClick={() => setActive(index)}
                            className={active === index ? "active" : ""}
                        >
                            <img
                                src={item.imgUrl}
                                alt={item.name}
                                width="180px"
                            />
                            <div className="content">
                                <span className="name">{item.name}</span>
                                <span
                                    onClick={() => copyOnClick(item.rgb)}
                                    className="rgb"
                                >
                                    {item.rgb}
                                </span>
                            </div>
                        </article>
                    ))}
            </section>
        </div>
    );
};
export default Accordion;
