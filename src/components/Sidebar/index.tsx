import React from "react";
import "./style.scss";
import { Link } from "react-router-dom";
import { chapterType } from "@src/types/sidebar";

interface SidebarProps {
    contents: chapterType[];
}
const Sidebar = ({ contents }: SidebarProps) => {
    const handleOnClick = (name: string) => {
        const subNav = document.querySelector<HTMLElement>(`#${name}`);
        const subNavInner = document.querySelector<HTMLElement>(
            `#${name} .sub-nav-inner`
        );

        if (subNav?.clientHeight === 0) {
            subNav?.classList.add("open");
            subNav!!.style.height = `${subNavInner?.clientHeight}px`;
        } else {
            subNav?.classList.remove("open");
            subNav!!.style.height = `0px`;
        }
    };

    return (
        <aside className="sidebar-container">
            <nav className="sidebar-nav">
                <header className="sidebar-header">StudyBook</header>
                {contents.map((chapter) => (
                    <div key={chapter.id}>
                        <button
                            className="sidebar-item"
                            onClick={() => handleOnClick(chapter.name)}
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
                                        <Link to={`/details/${item.id}`}>
                                            <span>{item.name}</span>
                                        </Link>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </nav>
        </aside>
    );
};
export default Sidebar;
