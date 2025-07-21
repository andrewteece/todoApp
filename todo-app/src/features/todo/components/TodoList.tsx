import { useTodoContext } from '@/features/todo/context/useTodoContext';
import type { Todo } from '@/features/todo/context/useTodoReducer';
import { TodoItem } from './TodoItem';
import type { DragEndEvent } from '@dnd-kit/core';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export function TodoList() {
  const {
    state: { todos, filter },
    dispatch,
  } = useTodoContext();

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = todos.findIndex((t) => t.id === active.id);
      const newIndex = todos.findIndex((t) => t.id === over?.id);

      const newTodos = arrayMove(todos, oldIndex, newIndex);
      dispatch({ type: 'REORDER_TODOS', payload: newTodos });
    }
  };

  if (filteredTodos.length === 0) {
    return (
      <p className='text-center mt-4 text-light-darkGrayishBlue dark:text-dark-darkGrayishBlue'>
        No {filter !== 'all' ? filter : ''} todos
      </p>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={filteredTodos.map((todo) => todo.id)}
        strategy={verticalListSortingStrategy}
      >
        <ul className='mt-4 space-y-2'>
          {filteredTodos.map((todo) => (
            <SortableTodo key={todo.id} todo={todo} />
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );
}

// Wrap TodoItem with draggable behavior
function SortableTodo({ todo }: { todo: Todo }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: todo.id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <TodoItem todo={todo} />
    </div>
  );
}
