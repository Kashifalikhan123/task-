import { Route, Switch } from "react-router-dom";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap";
// import "../node_modules/bootstrap/dist/css/bootstrap.css"
// import "../node_modules/bootstrap/dist/js/bootstrap.js"
// import '../node_modules/bootstrap/dist/js/bootstrap.bundle'

// compnents

import Home from "./components/Home/Home";
import Gallery from "./components/SystemAdmin/Gallery";
import Tables from "./components/SystemAdmin/Tables/Tables";
import Restaurant from "./components/SystemAdmin/Restaurants/Restaurant";
function App() {
  document.body.style.overflow = "unset";
  return (
    <>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/Gallery" component={Gallery} />
        <Route path="/Tables" component={Tables} />
        <Route path="/Restaurant" component={Restaurant} />
      </Switch>
    </>
  );
}

export default App;
