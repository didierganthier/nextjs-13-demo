import React from 'react';
import { notFound } from 'next/navigation';
import { Todo } from '../../../typings';

export const dynamicParams = true;

type PageProps = {
    params: {
        todoId: string
    }
}

const fetchTodo = async (todoId: string) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`, {
        next: {
            revalidate: 60,
        }
    });
    const todo: Todo = await res.json();
    return todo;
}

async function TodoPage({ params: { todoId } }: PageProps) {

    const todo = await fetchTodo(todoId)

    if(!todo.id) return notFound();

    return (
        <div className='p-10 bg-yellow-200 border-2 m-2 shadow-lg'>
            <p>
                #{todo.id}: {todo.title}
            </p>
            <p>
                Completed: {todo.completed ? 'Yes' : 'No'}
            </p>
            <p className='border-t border-5 mt-5 text-right'>
                By User: {todo.userId}
            </p>
        </div>
    )
}

export default TodoPage

export async function generateStaticParams() {
    const res = await fetch(`https://jsonplaceholder.typicode.com/todos/`);
    const todoa: Todo[] = await res.json();

    const trimmedTodos = todoa.slice(0, 10)

    return trimmedTodos.map(todo => ({
        todoId: todo.id.toString()
    }))
}
