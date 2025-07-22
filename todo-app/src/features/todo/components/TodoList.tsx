import {
  DndContext,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import { useTodoContext } from '@/features/todo/context/useTodoContext';
import { SortableTodo } from './SortableTodo';
import { AnimatePresence, motion } from 'framer-motion';

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

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = todos.findIndex((t) => t.id === active.id);
      const newIndex = todos.findIndex((t) => t.id === over?.id);

      const reordered = arrayMove(todos, oldIndex, newIndex);

      dispatch({ type: 'REORDER_TODOS', payload: reordered });
    }
  };

  if (!filteredTodos.length) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className='text-center text-muted-foreground text-sm py-4'
      >
        No todos
      </motion.div>
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
        <ul>
          <AnimatePresence initial={false}>
            {filteredTodos.map((todo) => (
              <SortableTodo key={todo.id} todo={todo} />
            ))}
          </AnimatePresence>
        </ul>
      </SortableContext>
    </DndContext>
  );
}
