import React from 'react';
import '../../style/toolbar.scss'
import toolState from "../../store/toolState";
import {observer} from "mobx-react-lite";

const SettingBar = observer(() => {

    return (
        <div className="setting-bar">
            <label htmlFor="line-wight">Толщина линии</label>
            <input onChange={(e) => toolState.setLineWight(e.target.value)}
                   style={{margin: '0 10px'}}
                   id="line-wight"
                   min={1} max={50} defaultValue={1}  type="number"/>
            <label htmlFor="stroke-color">Цвет обводки</label>
            <input onChange={(e) => toolState.setStrokeColor(e.target.value)}
                   id="stroke-color" type="color"/>
        </div>
    );
});

export default SettingBar;