import Keys from './keys';
import style from './component.module.css'
import { useState } from 'react';

function KeyBoard(props) {
    let [language, setLanguage] = useState(false);
    return (
        <div className={style.keyboard}>
            {language ? props.chareng.map((char, index) => <Keys key={index} char={char} click={props.click} />) : props.charhebrew.map((char, index) => <Keys key={index} char={char} click={props.click} />)}
            <div className={style.space} onClick={props.click} >&nbsp;</div>
            <div className={style.panel}>
                <ChangeLanguage change={() => { language ? setLanguage(false) : setLanguage(true) }} language={language} />
                <ClearAll clear = {()=>{props.clear()}} />
                <Delete delete = {()=>{props.delete()}} />
                <Enter enter = {()=>{props.enter()}} />
                <Color color = {()=>{props.color()}} next = {props.nextcolor}/>
            </div>
        </div>
    )
}

function ChangeLanguage(props) {

    return (
        <div className={style.change} onClick={(e) => { props.change(); props.language ? e.target.innerHTML = "English" : e.target.innerHTML = "עברית" }}>
            English
        </div>
    )
}
function ClearAll(props) {
    return (
        <div className={style.clearall} onClick={props.clear}>
             Delete All
        </div>
    )
}

function Delete(props) {
    return (
        <div className={style.delete} onClick={props.delete}>
             Delete
        </div>
    )
}

function Color(props) {
    return (
        <div className={style.color} onClick={props.color} style={{backgroundColor: props.next}}>
            {props.next}
        </div>
    )
}

function Enter(props) {
    return (
        <div className={style.color} onClick={props.enter}>
            Enter
        </div>
    )
}

export default KeyBoard;