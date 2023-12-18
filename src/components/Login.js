import React from 'react'
import style from '../style/component.module.css';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";

export default function Login() {
    const navigate = useNavigate();

    const onSubmitHadler = async () => {
        let userName = document.getElementById("name").value;
        let password = document.getElementById("password").value;
        const user = await fetch(
          `http://localhost:3500/users?username=${userName}&website=${password}`
        )
          .then((response) => response.json())
          .then((json) => {
              const user = json[0];
              if (json.length !== 0) {
                  localStorage.setItem("currentUser", JSON.stringify(user));
                  navigate(`/home/${user.id}`);
                }
                else {
                    alert("user is not exist")
                }
      });
    }

    return (
        <div className={style.login}>
            <h1 style={{color: "white"}}> Log In </h1>
            <form>
                <input className={style.inputPassword} id='name' type='text' placeholder='name'/>
                <br />
                <br />
                <input className={style.inputName} id='password' type='password' placeholder='password'/><br /><br />
                <div className={style.submit} onClick={ ()=>{onSubmitHadler()}}>Go</div>
            </form>
        </div>
    )
}


