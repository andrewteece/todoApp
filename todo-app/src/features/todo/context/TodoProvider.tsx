'use client';

import { useReducer, useEffect } from 'react';
import { TodoContext } from '@/features/todo/context/TodoContext';
import { todoReducer, initialState } from './useTodoReducer';
import type { Todo } from '@/features/todo/types';

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

  // --- Toggle completion state of a todo ---
  const toggleTodo = (id: string) => {
    dispatch({ type: 'TOGGLE_TODO', payload: id });
  };

  // --- Delete a todo ---
  const deleteTodo = (id: string) => {
    dispatch({ type: 'DELETE_TODO', payload: id });
  };

  // --- Clear all completed todos ---
  const clearCompleted = () => {
    dispatch({ type: 'CLEAR_COMPLETED' });
  };

  const setFilter = (filter: FilterType) => {
    dispatch({ type: 'SET_FILTER', payload: filter });
  };

  return (
    <TodoContext.Provider
      value={{
        state,
        dispatch,
        addTodo,
        clearCompleted,
        toggleTodo,
        deleteTodo,
        setFilter,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
