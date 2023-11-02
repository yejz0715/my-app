import React, { useState } from "react";
import "./style.scss";
import { cards } from "../../data/dummy";

const Accordion = () => {
    const [active, setActive] = useState(0);
    const copyOnClick = async (text: string) => {
        try {
            await navigator.clipboard.writeText(`${text}`);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="accordion-container">
            <section className="accordion-warp">
                {cards.map((item, index) => (
                    <article
                        key={index}
                        onClick={() => setActive(index)}
                        className={active === index ? "active" : ""}
                    >
                        <img src={item.imgUrl} alt={item.name} width="180px" />
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
