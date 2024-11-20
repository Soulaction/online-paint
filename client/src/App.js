import './style/app.scss'
import ToolBar from "./components/ToolBar/ToolBar";
import Canvas from "./components/Canvas/Canvas";
import React from "react";
import SettingBar from "./components/SettingBar/SettingBar";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";

function App() {

    return (
        <BrowserRouter>
            <div className="app">
                <Routes>
                    <Route path="/:id" element={
                        <React.Fragment>
                            <ToolBar/>
                            <SettingBar/>
                            <Canvas/>
                        </React.Fragment>}/>
                    <Route path="*" element={<Navigate to={`/f${Date.now().toString()}`}/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
