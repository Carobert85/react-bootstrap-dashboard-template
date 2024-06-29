import logo from './logo.svg';
import './App.css';
import Grid from "./components/grid/grid";
import Sidebar from "./components/nav/Sidebar";

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
