import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from 'react-dom';
import App from './App';
import ResultPage from "./ResultPage";

ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/form-data" element={<ResultPage />} />
        </Routes>
    </BrowserRouter>,
    document.getElementById('root')
);
