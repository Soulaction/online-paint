import React from 'react';
import '../../style/toolbar.scss'
import toolState from "../../store/toolState";
import canvasState from "../../store/canvasState";
import Brush from "../../tools/Brush";
import Rect from "../../tools/Rect";
import {Circle} from "../../tools/Circle";
import {Eraser} from "../../tools/Eraser";

const ToolBar = () => {

    const changeColor = e => {
        toolState.setFillColor(e.target.value)
        toolState.setStrokeColor(e.target.value)
    }

    return (
        <div className="toolbar">
            <button className="toolbar__btn brush" onClick={() => toolState.setTool(new Brush(canvasState.canvas, canvasState.socket, canvasState.sessionId))} />
            <button className="toolbar__btn rect" onClick={() => toolState.setTool(new Rect(canvasState.canvas))} />
            <button className="toolbar__btn circle" onClick={() => toolState.setTool(new Circle(canvasState.canvas))}/>
            <button className="toolbar__btn eraser" onClick={() => toolState.setTool(new Eraser(canvasState.canvas))}/>
            <button className="toolbar__btn line"/>
            <input onChange={(e) => changeColor(e)} style={{marginLeft: 10}} type="color"></input>
            <button className="toolbar__btn undo" onClick={() => canvasState.undo()}/>
            <button className="toolbar__btn redo" onClick={() => canvasState.redo()}/>
            <button className="toolbar__btn save"/>
        </div>
    );
};

export default ToolBar;