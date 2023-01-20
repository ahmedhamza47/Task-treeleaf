import "./App.css";

import { ContactContext } from "./Context/ContactContext";
import { Contacts } from "./components/Contacts.jsx";
import { AppBar, Typography, Box } from "@mui/material";

import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import Main from "./components/Main";
import Navbar from "./components/Navbar";
function App() {
  return (
    <>
      <ContactContext>
        <BrowserRouter>
          <Navbar />

          <Routes>
            <Route path="/" element={<Main />} />

            <Route path="/profile" element={<Contacts />} />
          </Routes>
        </BrowserRouter>
      </ContactContext>
    </>
  );
}

export default App;
