import "./App.css";
import Header from "./components/Navigation/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./components/Pages/Homepage";
import Login from "./components/Pages/Login";
import AddItem from "./components/Pages/AddItem";
import Contact from "./components/Pages/Contact";
import Signup from "./components/Pages/Signup";
import Bottom from "./components/Navigation/Bottom";
import CardDetails from "./components/Cards/CardDetails";
import UserPage from "./components/Pages/UserPage";
import { useDataContext } from "./context/DataContext";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <div className="app-container">
          <Routes>
            <Route path="/" element={<Homepage />}></Route>
            <Route path="/:id" element={<CardDetails />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/additem" element={<AddItem />}></Route>
            <Route path="/mypage" element={<UserPage />}></Route>
            <Route path="/contact" element={<Contact />}></Route>
          </Routes>
        </div>
        <Bottom />
      </div>
    </BrowserRouter>
  );
}

export default App;
