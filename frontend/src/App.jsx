import React from "react";
import { Routes, Route } from "react-router-dom";
import CreateBook from "./pages/CreateBook";
import ShowBook from "./pages/ShowBook";
import Home from "./pages/Home";
import EditBook from "./pages/EditBook";
import DeleteBook from "./pages/DeleteBook";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/book/create" element={<CreateBook />} />
      <Route path="/book/edit/:id" element={<EditBook />} />
      <Route path="/book/delete/:id" element={<DeleteBook />} />
      <Route path="/book/details/:id" element={<ShowBook />} />
    </Routes>
  );
};

export default App;
