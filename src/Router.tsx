import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import SelectBox from "./components/SelectBox";
import CheckBox from "./components/CheckBox";
import Accordion from "./components/Accordion";
import Svg from "./components/Svg";
import Canvas from "./components/Canvas";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main />}>
                    <Route path="/details/A01" element={<SelectBox />} />
                    <Route path="/details/A02" element={<CheckBox />} />
                    <Route path="/details/B00" element={<Accordion />} />
                    <Route path="/details/C01" element={<Svg />} />
                    <Route path="/details/C02" element={<Canvas />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};
export default Router;
