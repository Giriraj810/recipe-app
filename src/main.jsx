import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import Store from "./store/Store";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/style.css";
import Recipes from "./Pages/Recipe";

const Root = () => {
  return (
    <Provider store={Store}>
      <Router basename="/">
        <Routes>
          <Route path="" element={<Recipes />} />
          <Route path="favorites" element={<Favorites />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default Root;
import { createRoot } from "react-dom/client";
import Favorites from "./Pages/Favorites";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(<Root />);
