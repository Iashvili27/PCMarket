import "./App.css";
import Header from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./components/Homepage";
import Login from "./components/Login";
import AddItem from "./components/AddItem";
import Contact from "./components/Contact";
import Signup from "./components/Signup";
import Bottom from "./components/Bottom";

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
