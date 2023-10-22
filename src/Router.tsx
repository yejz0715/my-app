import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Details from "./pages/Details";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/details/:subId" element={<Details />} />
            </Routes>
        </BrowserRouter>
    );
};
export default Router;
