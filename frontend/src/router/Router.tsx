import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Layout} from "../Layout/Layout";
import {Main} from "../pages/Main";

export const AppRouter = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Main />} />
            </Route>
            <Route path="*" element={<div>404</div>} />
        </Routes>
    </BrowserRouter>
);