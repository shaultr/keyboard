import logo from './logo.svg';
import './App.css';
import KeyBoard from './components/keyboard';
import Screen from './components/screan';
import { useState } from 'react';
let index = 0;

function App() {
  let [text, setText] = useState("Enter your text here");
  const colors = ["red", "green", "blue", "pink", "orange", "purple", "black"];
  let [color, setColor] = useState("black");
  const changeColor = () => {
    setColor(colors[index]);
    index===color.length? index = 0 : index++;


  };
  const addtext = (e) => {
    let newKey = e.target.textContent;
    setText(text === "Enter your text here" ? newKey : text + newKey);
    console.log(text)
  };
  const charEng = "1 2 3 4 5 6 7 8 9 0 q w e r t y u i o p a s d f g h j k l ; z x c v b n m".split(" ");
  const charHebrew = "1234567890/'קראטוןםפשדגכעיחלךףזסבהנמצתץ".split("");
  return (
    <div className="App">
      <Screen text={text} color={color} />
      <KeyBoard chareng={charEng} charhebrew={charHebrew}
        click={addtext}
        clear={() => { setText("") }}
        delete={() => { setText(text.substring(0, text.length - 1)) }}
        color={changeColor} 
        nextcolor = {colors[index]}
        enter = { () => { setText(text + '\n'); }}
        
        />
    </div>
  );
}







export default App;
