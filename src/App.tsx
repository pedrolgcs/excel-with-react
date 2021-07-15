import React from "react";
import { Toaster } from "react-hot-toast";

// pages
import Home from "./pages/Home";

// styles
import "./styles/global.scss";

function App() {
  return (
    <>
      <Toaster />
      <Home />
    </>
  );
}

export default App;
