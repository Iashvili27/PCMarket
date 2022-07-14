import "./App.css";
import Header from "./components/Navigation/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./components/Pages/Homepage";
import Login from "./components/Pages/Login";
import AddItem from "./components/Pages/AddItem";
import Contact from "./components/Pages/Contact";
import Signup from "./components/Pages/Signup";
import Bottom from "./components/Navigation/Bottom";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/additem" element={<AddItem />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
        </Routes>
        <Bottom />
      </div>
    </BrowserRouter>
  );
}

export default App;
