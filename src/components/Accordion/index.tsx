import React, { useState } from "react";
import imgRed from "../../assets/red.png";
import imgBlue from "../../assets/blue.png";
import imgBlack from "../../assets/black.png";
import { cardType } from "@src/types/sidebar";
import "./style.scss";
const Accordion = () => {
    const cards: cardType[] = [
        {
            name: "red",
            imgUrl: imgRed,
        },
        {
            name: "blue",
            imgUrl: imgBlue,
        },
        {
            name: "black",
            imgUrl: imgBlack,
        },
    ];
    const [active, setActive] = useState(0);

    return (
        <section className="accordion-container">
            {cards.map((item, index) => (
                <article
                    key={index}
                    onClick={() => setActive(index)}
                    className={active === index ? "active" : ""}
                >
                    <img src={item.imgUrl} alt={item.name} />
                </article>
            ))}
        </section>
    );
};
export default Accordion;
