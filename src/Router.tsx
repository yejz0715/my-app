import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Details from "./pages/Details";
import DefaultSelect from "./components/Select/DefaultSelect";
import CheckBoxSelect from "./components/Select/CheckBoxSelect";
import InputSelect from "./components/Select/InputSelect";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main />}>
                    <Route path="/details/a01" element={<DefaultSelect />} />
                    <Route path="/details/a02" element={<CheckBoxSelect />} />
                    <Route path="/details/a03" element={<InputSelect />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};
export default Router;
