import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {Layout} from "../Layout/Layout";
import {Main} from "../pages/Main";

export const AppRouter = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route path="disciplines" element={<Main/>}/>
                <Route path="courses" element={<Main/>}/>
                <Route path="modules" element={<Main/>}/>
                <Route path="teachers" element={<Main/>}/>
            </Route>
            <Route path="*" element={<div>404</div>}/>
        </Routes>
    </BrowserRouter>
);