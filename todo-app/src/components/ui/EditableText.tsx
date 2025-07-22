import { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';

interface EditableTextProps {
  value: string;
  onSave: (newValue: string) => void;
  className?: string;
  inputClassName?: string;
  disabled?: boolean;
}

export default function EditableText({
  value,
  onSave,
  className,
  inputClassName,
  disabled = false,
}: EditableTextProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) inputRef.current?.focus();
  }, [isEditing]);

  const save = () => {
    const trimmed = text.trim();
    if (trimmed && trimmed !== value) {
      onSave(trimmed);
    }
    setIsEditing(false);
  };

  const cancel = () => {
    setText(value);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') save();
    if (e.key === 'Escape') cancel();
  };

  if (isEditing) {
    return (
      <input
        ref={inputRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={save}
        onKeyDown={handleKeyDown}
        className={clsx(
          'bg-transparent border-b border-muted focus:border-primary outline-none transition text-base py-0.5 w-full',
          inputClassName
        )}
        aria-label='Edit text'
      />
    );
  }

  return (
    <span
      onDoubleClick={() => !disabled && setIsEditing(true)}
      className={clsx(
        'cursor-text break-words line-clamp-2 transition hover:underline',
        className,
        disabled && 'opacity-50 cursor-not-allowed'
      )}
      role='textbox'
      aria-readonly='true'
    >
      {value}
    </span>
  );
}
