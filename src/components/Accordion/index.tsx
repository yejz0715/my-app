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
        <>
            <section className="accordion-container">
                {cards.map((item, index) => (
                    <article
                        key={index}
                        onClick={() => setActive(index)}
                        className={active === index ? "active" : ""}
                    >
                        <img src={item.imgUrl} alt={item.name} />
                        <div className="content">
                            <span id="name">{item.name}</span>
                            <div className="rgb-content">
                                <span>{item.rgb}</span>
                                <button onClick={() => copyOnClick(item.rgb)}>
                                    copy
                                </button>
                            </div>
                        </div>
                    </article>
                ))}
            </section>
        </>
    );
};
export default Accordion;
