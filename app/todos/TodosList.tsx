import Link from 'next/link';
import React from 'react'
import { Todo } from '../../typings';

const fetchTodos = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/todos');
    const todos: Todo[] = await res.json();
    return todos;
}

async function TodosList() {

    const todos = await fetchTodos()

    return <>
        {todos.map((todo) => (
            <p key={todo.id}>
                <Link href={`/todos/${todo.id}`}>
                    {todo.title}
                </Link>
            </p>
        ))}
    </>
}

export default TodosList
