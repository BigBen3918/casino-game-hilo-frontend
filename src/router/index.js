import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainGame from "./MainGame";

function Routings() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainGame />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Routings;
