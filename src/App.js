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
import UserItems from "./components/Cards/UserItems";
import Options from "./components/Cards/Options";
import EditItem from "./components/Cards/EditItem";
import EmailVerifyPage from "./components/Pages/EmailVerifyPage";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <Header />
        <div className="min-h-[80vh]">
          <Routes>
            <Route path="/" element={<Homepage />}></Route>
            <Route path="/:id" element={<CardDetails />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/verify" element={<EmailVerifyPage />}></Route>
            <Route path="/" element={<UserPage />}>
              <Route path="additem" element={<AddItem />}></Route>
              <Route path="myproducts" element={<UserItems />} />
              <Route path="options" element={<Options />} />
              <Route path="edititem:id" element={<EditItem />} />
            </Route>
            <Route path="/contact" element={<Contact />}></Route>
          </Routes>
        </div>
        <Bottom />
      </div>
    </BrowserRouter>
  );
}

export default App;
