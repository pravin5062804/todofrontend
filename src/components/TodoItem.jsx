import React, { useState } from 'react';
import { Trash2, Edit3, Check, X, Calendar, Terminal } from 'lucide-react';

const TodoItem = ({ todo, onToggle, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description || '');

  const handleSave = () => {
    if (!title.trim()) return;
    onUpdate(todo._id, { title, description });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTitle(todo.title);
    setDescription(todo.description || '');
    setIsEditing(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  return (
    <div
      className={`relative overflow-hidden rounded-xl border font-mono transition-all duration-300 ${
        todo.completed
          ? 'border-slate-800/80 bg-slate-950/40 text-slate-500'
          : 'border-slate-800 bg-slate-900/40 text-slate-100 shadow-lg shadow-black/10 hover:border-slate-700/80 hover:bg-slate-900/60'
      }`}
    >
      <div className="p-5">
        {isEditing ? (
          <div className="space-y-3.5">
            <div className="flex items-center space-x-2 text-xs text-indigo-400">
              <Terminal className="h-3.5 w-3.5" />
              <span>EDIT_MODE: true</span>
            </div>
            
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="block w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-200 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 font-mono"
              placeholder="task_title"
            />
            
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
              className="block w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-200 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 resize-none font-mono"
              placeholder="task_description"
            />
            
            <div className="flex justify-end space-x-2 text-xs">
              <button
                onClick={handleCancel}
                className="flex items-center space-x-1 rounded border border-slate-800 bg-slate-900 px-3 py-1.5 font-medium text-slate-400 hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="h-3.5 w-3.5" />
                <span>cancel()</span>
              </button>
              <button
                onClick={handleSave}
                className="flex items-center space-x-1 rounded bg-violet-600 px-3 py-1.5 font-semibold text-white hover:bg-violet-500 transition-colors cursor-pointer"
              >
                <Check className="h-3.5 w-3.5" />
                <span>save_changes()</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="flex items-start space-x-4 min-w-0 flex-1">
              {/* Dev Checkbox */}
              <button
                onClick={() => onToggle(todo._id, !todo.completed)}
                className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-all duration-200 cursor-pointer ${
                  todo.completed
                    ? 'border-violet-500/80 bg-violet-600/10 text-violet-400'
                    : 'border-slate-700 bg-slate-950 hover:border-slate-500'
                }`}
              >
                {todo.completed ? (
                  <Check className="h-3.5 w-3.5 stroke-[3]" />
                ) : (
                  <div className="h-1.5 w-1.5 rounded-sm bg-transparent group-hover:bg-slate-600"></div>
                )}
              </button>

              {/* Todo Content */}
              <div className="min-w-0 flex-1 space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <h3
                    className={`text-sm md:text-base font-bold break-words transition-all duration-300 ${
                      todo.completed ? 'text-slate-600 line-through' : 'text-slate-100'
                    }`}
                  >
                    {todo.title}
                  </h3>
                  
                  {/* Status Badge */}
                  <span
                    className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${
                      todo.completed
                        ? 'bg-slate-950 text-slate-600 border border-slate-800'
                        : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                    }`}
                  >
                    {todo.completed ? 'status:done' : 'status:todo'}
                  </span>
                </div>

                {todo.description && (
                  <p
                    className={`text-xs md:text-sm break-words max-w-2xl leading-relaxed ${
                      todo.completed ? 'text-slate-700 line-through' : 'text-slate-400'
                    }`}
                  >
                    {todo.description}
                  </p>
                )}

                {/* Metadata Comment */}
                <div className="flex items-center space-x-1.5 text-[10px] text-slate-600 font-mono">
                  <span>// created_on:</span>
                  <Calendar className="h-3 w-3 inline" />
                  <span>{formatDate(todo.createdAt)}</span>
                </div>
              </div>
            </div>

            {/* Todo Action Buttons */}
            <div className="flex items-center self-end md:self-start space-x-1 text-xs">
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center space-x-1 rounded border border-slate-800 bg-slate-900/50 hover:bg-slate-800 px-2.5 py-1.5 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
                title="edit_task()"
              >
                <Edit3 className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">edit()</span>
              </button>
              <button
                onClick={() => onDelete(todo._id)}
                className="flex items-center space-x-1 rounded border border-slate-800 bg-slate-900/50 hover:bg-red-950/20 px-2.5 py-1.5 text-slate-500 hover:text-red-400 hover:border-red-950/40 transition-colors cursor-pointer"
                title="delete_task()"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">delete()</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoItem;
