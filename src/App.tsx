import Header from "./components/Header";
import SelectBox from "./components/SelectBox";
import Sidebar from "./components/Sidebar";
import Main from "./pages/Main";
const App = () => {
    return (
        <div className="app-container">
            <Sidebar />
            <Main />
        </div>
    );
};
export default App;
