import React from 'react'
import style from '../style/component.module.css';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";

export default function Login() {
    const navigate = useNavigate();

    const onSubmitHadler = async (event) => {
        let userName = document.getElementById("name").value;
        let password = document.getElementById("password").value;
        const user = await fetch(
          `http://localhost:3500/users?username=${userName}&website=${password}`
        )
          .then((response) => response.json())
          .then((json) => {
              const userId = json[0].id;
              if (json.length !== 0) {
                  
                  navigate(`/home/${userId}`);
                }
                else{
                    alert("user is not exist")
                }
      });
    }

    return (
        <div className={style.login}>
            <form>
                <input id='name' type='text' placeholder='name'/>
                <br />
                <br />
                <input id='password' type='password' placeholder='password'/><br /><br />
                <div className={style.submit} onClick={ ()=>{onSubmitHadler()}}>Go</div>
            </form>
        </div>
    )
}
