import { Check, Trash2, X } from 'lucide-react'
import { useState } from 'react'

interface TodoItemProps {
  todo: {
    id: string
    text: string
    completed: boolean
  }
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={`flex items-center p-4 mb-2 rounded-lg transition-all duration-200 ${
        todo.completed
          ? 'bg-green-50 border border-green-100'
          : 'bg-white border border-gray-100'
      } ${isHovered ? 'shadow-md' : 'shadow-sm'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        onClick={() => onToggle(todo.id)}
        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors duration-200 ${
          todo.completed
            ? 'bg-green-500 border-green-500'
            : 'border-gray-300 hover:border-green-500'
        }`}
      >
        {todo.completed && <Check size={14} className="text-white" />}
      </button>
      <span
        className={`flex-1 ml-3 text-gray-800 ${
          todo.completed ? 'line-through text-gray-500' : ''
        }`}
      >
        {todo.text}
      </span>
      <button
        onClick={() => onDelete(todo.id)}
        className="text-gray-400 hover:text-red-500 transition-colors duration-200"
      >
        <Trash2 size={18} />
      </button>
    </div>
  )
}
