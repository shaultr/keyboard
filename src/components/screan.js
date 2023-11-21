import style from './component.module.css'

function Screen(props) {
    
    return (
        <div className={style.screan}>
           <pre style={{color: props.color}}> {props.text} </pre>
        </div>
    )
}
export default Screen;