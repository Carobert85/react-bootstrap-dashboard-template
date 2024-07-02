import logo from './logo.svg';
import './App.css';
import Grid from "./components/grids/Grid";
import Sidebar from "./components/nav/Sidebar";
import SortableAccordion from "./components/accordion/SortableAccordion";

function App() {
    return (
        <div className="App">

            <div className="sidebar"><Sidebar/></div>

            <div className="main-content">

                <div className="grid">

                    <Grid></Grid>
                </div>

            </div>

        </div>
    );
}

export default App;
