import { Route, Router, Routes } from "react-router-dom";

import Home from "./screens/Home";
import Login from "./screens/Login";
import "../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import SignUp from "./screens/SignUp.jsx";
import MeraOrder from "./screens/MeraOrder.jsx";
import { CartProvider } from "./Components/ContextReducers.js";
import Cart from "./Components/Cart.js";
function App() {
  return (
    <CartProvider>
      <div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<SignUp />} />
          <Route exact path="/myorder" element={<MeraOrder />} />
        </Routes>
      </div>
    </CartProvider>
  );
}

export default App;
