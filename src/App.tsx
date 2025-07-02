import { CheckCircle2, ListTodo } from 'lucide-react'
import { useEffect, useState } from 'react'
import { TodoInput } from './components/TodoInput'
import { TodoItem } from './components/TodoItem'

interface Todo {
  id: string
  text: string
  completed: boolean
}

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('todos')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const addTodo = (text: string) => {
    setTodos([
      ...todos,
      { id: crypto.randomUUID(), text, completed: false },
    ])
  }

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const completedCount = todos.filter((todo) => todo.completed).length

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <ListTodo className="w-8 h-8 text-blue-500" />
            <h1 className="text-2xl font-semibold text-gray-800">
              Task Manager
            </h1>
          </div>

          <TodoInput onAdd={addTodo} />

          <div className="space-y-2">
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
              />
            ))}
          </div>

          {todos.length > 0 && (
            <div className="mt-6 flex items-center gap-2 text-sm text-gray-600">
              <CheckCircle2 size={16} className="text-green-500" />
              <span>
                {completedCount} of {todos.length} tasks completed
              </span>
            </div>
          )}

          {todos.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <ListTodo className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No tasks yet. Add one above!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
