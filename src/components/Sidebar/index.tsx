import React, { useState } from "react";
import "./style.scss";
import { Link } from "react-router-dom";
import { sidebarProps } from "@src/types/components";

/**
 * Sidebar component 입니다.
 * @param { sidebarProps } contents
 * @returns {JSX.Element}
 */
const Sidebar = ({ contents }: sidebarProps): JSX.Element => {
    const [isActive, setIsActive] = useState("");

    //클릭 이벤트 함수_ 해당 HTML 요소를 찾아서 서브 네비게이션을 열거나 닫아줍니다.
    const handleOnClick = (name: string) => {
        const subNav = document.querySelector<HTMLElement>(`#${name}`);
        const subNavInner = document.querySelector<HTMLElement>(
            `#${name} .sub-nav-inner`
        );

        if (!subNav || !subNavInner) return;

        if (subNav.clientHeight === 0) {
            subNav.classList.add("open");
            subNav.style.height = `${subNavInner.clientHeight}px`;
        } else {
            subNav.classList.remove("open");
            subNav.style.height = `0px`;
        }
    };

    return (
        <aside className="sidebar-container">
            <nav className="sidebar-nav">
                <header className="sidebar-header">StudyBook</header>

                {contents &&
                    contents.map((chapter) => (
                        <div key={chapter.id}>
                            {chapter.children.length === 0 ? (
                                <button className="sidebar-item">
                                    <Link
                                        to={`/details/${chapter.id}`}
                                        className="sidebar-item-label"
                                    >
                                        <span>{chapter.name}</span>
                                    </Link>
                                </button>
                            ) : (
                                <>
                                    <button
                                        className="sidebar-item"
                                        onClick={() =>
                                            handleOnClick(chapter.name)
                                        }
                                    >
                                        <span>{chapter.name}</span>
                                    </button>

                                    <div className="sub-nav" id={chapter.name}>
                                        <div className="sub-nav-inner">
                                            {chapter.children.map((item) => (
                                                <button
                                                    key={item.id}
                                                    className="sidebar-item"
                                                >
                                                    <Link
                                                        to={`/details/${item.id}`}
                                                        className="sidebar-item-children-label"
                                                    >
                                                        <span>{item.name}</span>
                                                    </Link>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
            </nav>
        </aside>
    );
};
export default Sidebar;
