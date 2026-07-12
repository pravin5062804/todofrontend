import React, { useState, useEffect, useContext } from 'react';
import { todoService } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import TodoForm from '../components/TodoForm';
import TodoItem from '../components/TodoItem';
import Navbar from '../components/Navbar';
import { ListTodo, CheckCircle, Clock, ClipboardList, RefreshCw } from 'lucide-react';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all'); // all, active, completed

  const fetchTodos = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await todoService.getTodos();
      setTodos(response.data.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch tasks. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleAddTodo = async (todoData) => {
    try {
      const response = await todoService.createTodo(todoData);
      setTodos((prev) => [response.data.data, ...prev]);
    } catch (err) {
      console.error(err);
      setError('Failed to add task.');
    }
  };

  const handleToggleTodo = async (id, completed) => {
    try {
      const response = await todoService.updateTodo(id, { completed });
      setTodos((prev) =>
        prev.map((todo) => (todo._id === id ? response.data.data : todo))
      );
    } catch (err) {
      console.error(err);
      setError('Failed to update task status.');
    }
  };

  const handleUpdateTodo = async (id, updatedFields) => {
    try {
      const response = await todoService.updateTodo(id, updatedFields);
      setTodos((prev) =>
        prev.map((todo) => (todo._id === id ? response.data.data : todo))
      );
    } catch (err) {
      console.error(err);
      setError('Failed to update task.');
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await todoService.deleteTodo(id);
      setTodos((prev) => prev.filter((todo) => todo._id !== id));
    } catch (err) {
      console.error(err);
      setError('Failed to delete task.');
    }
  };

  // Stats calculation
  const totalTasks = todos.length;
  const completedTasks = todos.filter((todo) => todo.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  // Filtered list
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-1 mx-auto max-w-4xl w-full px-4 py-8 sm:px-6 lg:px-8 space-y-8">
        {/* Welcome Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Hello, {user?.name}!
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              Manage your priorities and track your productivity.
            </p>
          </div>
          <button
            onClick={fetchTodos}
            className="flex self-start items-center space-x-1.5 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-800 px-3.5 py-2 text-xs font-semibold text-slate-300 hover:text-white transition-all cursor-pointer"
            title="Refresh tasks"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Sync</span>
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          {/* Card Total */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4 sm:p-5 flex items-center space-x-3.5">
            <div className="p-2.5 rounded-xl bg-slate-800 text-slate-300">
              <ClipboardList className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Total</p>
              <h4 className="text-xl sm:text-2xl font-bold mt-0.5">{totalTasks}</h4>
            </div>
          </div>

          {/* Card Completed */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4 sm:p-5 flex items-center space-x-3.5">
            <div className="p-2.5 rounded-xl bg-green-500/10 text-green-400">
              <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Done</p>
              <h4 className="text-xl sm:text-2xl font-bold mt-0.5 text-green-400">{completedTasks}</h4>
            </div>
          </div>

          {/* Card Pending */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4 sm:p-5 flex items-center space-x-3.5">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400">
              <Clock className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Pending</p>
              <h4 className="text-xl sm:text-2xl font-bold mt-0.5 text-amber-400">{pendingTasks}</h4>
            </div>
          </div>
        </div>

        {/* Input Form */}
        <TodoForm onAdd={handleAddTodo} />

        {error && (
          <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3.5 text-sm text-red-400 text-center">
            {error}
          </div>
        )}

        {/* Filters and List Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-lg font-semibold text-slate-200">Tasks</h2>
            
            {/* Filter Tabs */}
            <div className="flex space-x-1 bg-slate-900/80 p-0.5 rounded-lg border border-slate-800">
              {['all', 'active', 'completed'].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilter(type)}
                  className={`px-3 py-1 text-xs font-medium rounded-md capitalize transition-all cursor-pointer ${
                    filter === type
                      ? 'bg-slate-800 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Tasks List */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-3">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-violet-500 border-t-transparent"></div>
              <p className="text-sm text-slate-400">Loading tasks...</p>
            </div>
          ) : filteredTodos.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center border border-dashed border-slate-800 rounded-2xl bg-slate-900/10 px-4">
              <div className="p-4 rounded-full bg-slate-900 text-slate-500 mb-4">
                <ListTodo className="h-8 w-8" />
              </div>
              <h3 className="text-base font-semibold text-slate-300">No tasks found</h3>
              <p className="mt-1.5 text-sm text-slate-500 max-w-xs">
                {filter === 'all'
                  ? 'Get started by typing a task and details in the form above.'
                  : filter === 'active'
                  ? "Hooraay! You don't have any pending tasks."
                  : "You haven't completed any tasks yet. Keep going!"}
              </p>
            </div>
          ) : (
            <div className="grid gap-3.5">
              {filteredTodos.map((todo) => (
                <TodoItem
                  key={todo._id}
                  todo={todo}
                  onToggle={handleToggleTodo}
                  onDelete={handleDeleteTodo}
                  onUpdate={handleUpdateTodo}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
