import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import style from '../style/component.module.css';
import { useState, useEffect } from 'react';

export default function Post(props) {
  const [displayBody, setDisplayBody] = useState(false);
  const userId = useParams();
  return (
    <>
      <div className={style.postContainer}>
        <div className={style.post}>
          <h3 onClick={() => { setDisplayBody(!displayBody) }}>[{props.post.id}] {props.post.title} </h3>
        </div>
      </div>
        <div className={style.displayBody} style={displayBody ? { display: "block" } : { display: "none" }}>{props.post.body}</div>
    </>
  )
}
