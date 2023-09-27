import React from "react";
import "./style.scss";
const Sidebar = () => {
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
                <div>
                    <button
                        className="sidebar-item"
                        onClick={() => handleOnClick("test")}
                    >
                        <span>test</span>
                    </button>
                    <div className="sub-nav" id="test">
                        <div className="sub-nav-inner">
                            <button className="sidebar-item">
                                <span>서브1</span>
                            </button>

                            <button className="sidebar-item">
                                <span>서브2</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <button className="sidebar-item">
                        <span>test2</span>
                    </button>
                </div>
            </nav>
        </aside>
    );
};
export default Sidebar;
