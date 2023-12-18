import style from './component.module.css'
function Keys(props) {
    return (
        <div className={style.key} onClick={props.click}>
            {props.char}
        </div>

    )
}

export default Keys