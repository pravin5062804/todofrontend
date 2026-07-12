import React, { useState } from 'react';
import { Plus } from 'lucide-react';

const TodoForm = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAdd({ title, description });
    setTitle('');
    setDescription('');
    setIsExpanded(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 p-5 shadow-lg transition-all duration-300 focus-within:border-slate-700"
    >
      <div className="space-y-3">
        <input
          type="text"
          placeholder="Add a new task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onFocus={() => setIsExpanded(true)}
          className="w-full bg-transparent text-slate-100 placeholder-slate-500 focus:outline-none sm:text-base font-medium"
        />

        {isExpanded && (
          <div className="space-y-4 pt-2 border-t border-slate-800/60 transition-all duration-200">
            <textarea
              placeholder="Add details / description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
              className="w-full bg-transparent text-sm text-slate-300 placeholder-slate-500 focus:outline-none resize-none"
            />
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setIsExpanded(false)}
                className="rounded-xl border border-slate-800 bg-transparent px-4 py-2 text-xs font-semibold text-slate-400 hover:bg-slate-800/40 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!title.trim()}
                className="flex items-center space-x-1.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:from-violet-500 hover:to-indigo-500 disabled:opacity-50 disabled:pointer-events-none transition-all shadow-md cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                <span>Add Task</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </form>
  );
};

export default TodoForm;
