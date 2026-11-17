import React, { useState } from 'react';
import {
  CheckCircle2,
  Circle,
  Plus,
  Trash2,
  Clock,
  BookOpen,
  Volume2,
  Mic,
  FileText,
  PenTool,
  Bot,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

const ICON_MAP = {
  BookOpen,
  Volume2,
  Mic,
  FileText,
  PenTool,
  Bot
};

export default function DailyRoutine({
  routine,
  onToggleTask,
  onAddTask,
  onDeleteTask,
  onNavigateTab
}) {
  const [filter, setFilter] = useState('all'); // 'all', 'pending', 'completed'
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDesc, setNewTaskDesc] = useState('');
  const [newTaskDuration, setNewTaskDuration] = useState('10 mins');
  const [newTaskCategory, setNewTaskCategory] = useState('Speaking');

  const filteredTasks = routine.filter((task) => {
    if (filter === 'pending') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const handleToggle = (id) => {
    const updated = routine.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
    const wasCompleted = routine.find(t => t.id === id)?.completed;
    const nowAllComplete = updated.every(t => t.completed);

    onToggleTask(id);

    // If completing the last remaining task, throw confetti celebration!
    if (!wasCompleted && nowAllComplete) {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handleCreateTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask = {
      id: 'custom-' + Date.now(),
      title: newTaskTitle.trim(),
      description: newTaskDesc.trim() || 'Custom daily practice task',
      duration: newTaskDuration || '10 mins',
      category: newTaskCategory,
      icon: 'Mic',
      completed: false,
      isCustom: true
    };

    onAddTask(newTask);
    setNewTaskTitle('');
    setNewTaskDesc('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-4">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <span>📅 Today’s Practice Routine</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-normal border border-slate-700">
              {routine.filter(t => t.completed).length}/{routine.length} Done
            </span>
          </h3>
          <p className="text-xs text-slate-400">
            রুটিনের প্রতিটি কাজ শেষ করে টিক চিহ্ন দিন এবং ফ্লুয়েন্সি বাড়ান
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
          {/* Filters */}
          <div className="flex bg-slate-800/80 p-0.5 rounded-lg border border-slate-700/60 text-xs">
            {['all', 'pending', 'completed'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1 rounded-md capitalize transition-all cursor-pointer ${
                  filter === f
                    ? 'bg-indigo-600 text-white font-medium shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Add custom task button */}
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium transition-all shadow-md shadow-indigo-600/20 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Task</span>
          </button>
        </div>
      </div>

      {/* Task List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {filteredTasks.map((task) => {
          const IconComponent = ICON_MAP[task.icon] || Mic;

          return (
            <div
              key={task.id}
              className={`group relative rounded-xl border p-4 transition-all flex flex-col justify-between ${
                task.completed
                  ? 'bg-slate-900/40 border-emerald-500/30 opacity-75'
                  : 'bg-slate-900/90 hover:bg-slate-850 border-slate-800 hover:border-slate-700 shadow-lg'
              }`}
            >
              <div className="flex items-start gap-3.5">
                {/* Toggle Checkbox */}
                <button
                  onClick={() => handleToggle(task.id)}
                  className="mt-0.5 text-slate-500 hover:text-indigo-400 transition-colors cursor-pointer"
                  title={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
                >
                  {task.completed ? (
                    <CheckCircle2 className="w-6 h-6 text-emerald-400 fill-emerald-400/20" />
                  ) : (
                    <Circle className="w-6 h-6 text-slate-500 hover:text-indigo-400" />
                  )}
                </button>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`text-sm font-semibold transition-all ${
                        task.completed
                          ? 'line-through text-slate-400'
                          : 'text-white'
                      }`}
                    >
                      {task.title}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-indigo-300 font-medium border border-slate-700/60">
                      {task.category}
                    </span>
                  </div>

                  <p className="mt-1 text-xs text-slate-400 line-clamp-2">
                    {task.description}
                  </p>
                </div>

                {/* Custom Task Delete */}
                {task.isCustom && (
                  <button
                    onClick={() => onDeleteTask(task.id)}
                    className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-red-400 transition-all p-1 cursor-pointer"
                    title="Delete task"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Bottom bar of card */}
              <div className="mt-3 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{task.duration}</span>
                </div>

                {/* Quick action buttons depending on category */}
                {task.id === 'vocab' && (
                  <button
                    onClick={() => onNavigateTab('vocab')}
                    className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300 font-medium cursor-pointer"
                  >
                    <span>Open Words</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                )}
                {task.id === 'speaking' && (
                  <button
                    onClick={() => onNavigateTab('speech')}
                    className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300 font-medium cursor-pointer"
                  >
                    <span>Start Speaking</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                )}
                {task.id === 'ai-chat' && (
                  <button
                    onClick={() => onNavigateTab('ai')}
                    className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300 font-medium cursor-pointer"
                  >
                    <span>AI Scenarios</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                )}
                {task.id === 'journal' && (
                  <button
                    onClick={() => onNavigateTab('journal')}
                    className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300 font-medium cursor-pointer"
                  >
                    <span>Write Now</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredTasks.length === 0 && (
        <div className="p-8 text-center rounded-xl border border-dashed border-slate-800 text-slate-400 text-sm">
          No tasks found under this filter.
        </div>
      )}

      {/* Add Task Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <h4 className="text-base font-bold text-white mb-1">
              Add New Routine Habit
            </h4>
            <p className="text-xs text-slate-400 mb-4">
              আপনার প্রয়োজনমতো যেকোনো স্পিকিং বা লিসেনিং টাস্ক যুক্ত করুন
            </p>

            <form onSubmit={handleCreateTask} className="space-y-3.5">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Task Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 15 mins BBC 6-Minute English"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Description / Instruction
                </label>
                <input
                  type="text"
                  placeholder="e.g. Listen twice and write 2 new phrases"
                  value={newTaskDesc}
                  onChange={(e) => setNewTaskDesc(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Duration
                  </label>
                  <select
                    value={newTaskDuration}
                    onChange={(e) => setNewTaskDuration(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-indigo-500"
                  >
                    <option value="5 mins">5 mins</option>
                    <option value="10 mins">10 mins</option>
                    <option value="15 mins">15 mins</option>
                    <option value="20 mins">20 mins</option>
                    <option value="30 mins">30 mins</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Category
                  </label>
                  <select
                    value={newTaskCategory}
                    onChange={(e) => setNewTaskCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Speaking">Speaking</option>
                    <option value="Listening">Listening</option>
                    <option value="Reading">Reading</option>
                    <option value="Writing">Writing</option>
                    <option value="Vocabulary">Vocabulary</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 text-xs font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 cursor-pointer"
                >
                  Save Habit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
