'use client';

import { useReducer, useEffect } from 'react';
import { TodoContext } from '@/features/todo/context/TodoContext';
import { todoReducer, initialState } from './useTodoReducer';
import type { Todo } from '@/features/todo/types'; // Adjust if your Todo type is elsewhere

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  // --- Type guard for validating todo objects ---
  function isTodo(obj: unknown): obj is Todo {
    return (
      typeof obj === 'object' &&
      obj !== null &&
      typeof (obj as Todo).id === 'string' &&
      typeof (obj as Todo).title === 'string' &&
      typeof (obj as Todo).completed === 'boolean'
    );
  }

  // --- Initialize state from localStorage (validated) ---
  const [state, dispatch] = useReducer(todoReducer, initialState, () => {
    try {
      const saved = localStorage.getItem('todos');
      const parsed = saved ? JSON.parse(saved) : null;

      if (
        parsed &&
        typeof parsed === 'object' &&
        Array.isArray(parsed.todos) &&
        parsed.todos.every(isTodo)
      ) {
        return parsed;
      }
    } catch (err) {
      console.error('Error parsing saved todos:', err);
    }

    return initialState;
  });

  // --- Persist state to localStorage ---
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(state));
  }, [state]);

  // --- Add a new todo ---
  const addTodo = (title: string) => {
    dispatch({
      type: 'ADD_TODO',
      payload: {
        id: crypto.randomUUID(),
        title,
        completed: false,
      },
    });
  };

  // --- Clear completed todos ---
  const clearCompleted = () => {
    dispatch({ type: 'CLEAR_COMPLETED' });
  };

  return (
    <TodoContext.Provider value={{ state, dispatch, addTodo, clearCompleted }}>
      {children}
    </TodoContext.Provider>
  );
};
