import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import style from '../style/component.module.css';
import { useState, useEffect } from 'react';
import Todo from './todo';
export default function Todos() {
    const userId = useParams();
    const navigate = useNavigate();
    const [addTodo, setAddTodo] = useState(false);
    const [search, setSearch] = useState(false);

    const [todos, setTodos] = useState([]);

    const fetchData = async () => {
        const response = await fetch(`http://localhost:3500/todos?userId=${userId.id}`)
        const arrJson = await response.json();
        setTodos(arrJson);
    }

    useEffect(() => {
        fetchData()
    }, []);


    const todoCompleted = (id) => {
        const listTodos = todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo)
        setTodos(listTodos);
        const myItem = listTodos.filter((item) => item.id === id);
        fetch(`http://localhost:3500/todos/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({ completed: myItem[0].completed }),
            headers: { 'Content-Type': 'application/json' }
        }
        )
            .then((res) => res.json())
            .then((data) => console.log(data.completed))
    }

    const upDateTitle = (e, id) => {
        e.preventDefault();
        const editTask = e.target.upDateTodo.value;
        if (editTask.length===0) return
        const listTodos = todos.map(todo => todo.id === id ? { ...todo, title: editTask } : todo)
        setTodos(listTodos);
        const myItem = listTodos.filter((item) => item.id === id);
        fetch(`http://localhost:3500/todos/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({ title: myItem[0].title }),
            headers: { 'Content-Type': 'application/json' }
        }
        )
            .then((res) => res.json())
    }


    const deleteTodo = (id) => {
        fetch(`http://localhost:3500/todos/${id}`, {
            method: 'DELETE'
        })
            .then((item) => fetchData()
            )
    }


    const displeyTodos = () => {
        return todos.map((item) => (
            <Todo fetchData={fetchData} item={item} deleteTodo={deleteTodo} todoCompleted={todoCompleted} upDateTitle={upDateTitle} />

        ))

    }


    const randomComparison = () => Math.random() - 0.5;
    const randomSort = () => {
        const newArr = [...todos].sort((a, b) => randomComparison());
        setTodos(newArr);
    }

    const alphabet = () => {
        const newArr = [...todos].sort((a, b) => a.title.localeCompare(b.title));
        setTodos(newArr);

    }
    const isCompleted = () => {
        const newArr = [...todos].sort((a, b) => (a.completed === b.completed ? 0 : a.completed ? -1 : 1));
        setTodos(newArr);

    }
    const handleSelect = (event) => {
        if (event.target.value === "a-z") {
            alphabet();
        }
        else if (event.target.value === "Serial") {
            fetchData()
        }
        else if (event.target.value === "Completed") {
            isCompleted()
        }
        else if (event.target.value === "Random") {
            randomSort()
        }
    }


    const creatNewTodo = (e) => {
        e.preventDefault();
        const newTodo = e.target.add.value;
        if (newTodo.length === 0) return;
        todos.push({ userId: userId.id, title: newTodo, completed: false })
        setTodos(todos);
        fetch(`http://localhost:3500/todos?userId=${userId.id}`, {
            method: 'POST',
            body: JSON.stringify({ userId: userId.id, title: newTodo, completed: false }),
            headers: { 'Content-Type': 'application/json' }
        }
        )
            .then((item) => fetchData());
        setAddTodo(false);
    }
    const toSearch = (e) => {
        let searchTitle = e.target.value;
        let sortedTodos = [];
        todos.filter((element) => {
            if (element.title != null && element.title.startsWith(searchTitle)) {
                sortedTodos.push(element)
            }
        })
        searchTitle === '' ? fetchData() : setTodos(sortedTodos);
        return sortedTodos.map((item) => (
            <Todo fetchData={fetchData} item={item} deleteTodo={deleteTodo} todoCompleted={todoCompleted} upDateTitle={upDateTitle} />
        ))

    }

    let currentUser = localStorage.getItem("currentUser");
    let currentUserObject = JSON.parse(currentUser);
    let currentName = currentUserObject.name;

    return (
        <div>
            <div className={style.links} onClick={() => { navigate(`/home/${userId.id}`) }}>Home</div>
            <h1>tasks of {currentName} !</h1>
            <div className={style.todosContainer}>
                <div className={style.header}>
                    <span className={style.selectBy}>  Order by:</span>

                    <select className={style.select} onChange={handleSelect}>
                        <option >Order by</option>
                        <option value="a-z">A-Z</option>
                        <option value="Serial">Serial</option>
                        <option value="Completed">Completed</option>
                        <option value="Random">Random</option>
                    </select>
                    <div className={style.addTodoButton} onClick={() => { setAddTodo(true) }}>Add Todo</div>
                    <div className={style.addTodoButton} onClick={() => setSearch(true)}>Search</div></div>
                <br />
                <form style={addTodo ? { display: "block" } : { display: "none" }} onSubmit={(e) => { creatNewTodo(e) }}>
                    <input className={style.addTodo} name='add' placeholder='Add a task' />
                    <button className={style.sendNewTodo}>Send</button>
                </form>
                <input className={style.search} name='search' placeholder='search' style={search ? { display: "block" } : { display: "none" }} onChange={(e) => toSearch(e)} />
                {displeyTodos()}
            </div>

            <form>

            </form>
        </div>
    )
}
