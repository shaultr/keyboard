import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import style from '../style/component.module.css';
import { useState, useEffect } from 'react';

export default function Todos() {
    const route = useParams();
    const navigate = useNavigate();

    const [titles, setTitles] = useState([]);

    useEffect(() => {
        const fetchData = async() => {
            const response = await fetch(`http://localhost:3500/todos/${route.id}`)
            const arrjson = await response.json();
            setTitles(arrjson);
        }
        fetchData()
        }, []);



        return (
            <div>
                <div className={style.links} onClick={() => { navigate(`/home/${route.id}`) }}>Home</div>
                <div>
                    <h1>titles:</h1>
                    {titles}
                </div>

                <form>
                    <input type='checkbox'></input><br />
                    <input type='checkbox'></input><br />
                    <input type='checkbox'></input><br />
                    <input type='checkbox'></input><br />
                    <input type='checkbox'></input><br />
                    <div onClick={() => { alert(titles[0].title) }}>wwwwwwwwww</div>
                    <select name="cars" id="cars">
                        <option value="volvo">סידורי</option>
                        <option value="saab">ביצועי</option>
                        <option value="mercedes">אלפבתי</option>
                        <option value="audi">אקראי</option>
                    </select>
                </form>
            </div>
        )
    }
