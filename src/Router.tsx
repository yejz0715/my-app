import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main />}>
                    <Route path="/details/:subId" element={<Main />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};
export default Router;
