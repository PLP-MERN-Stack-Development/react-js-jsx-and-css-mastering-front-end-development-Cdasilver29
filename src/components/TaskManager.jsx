import React, { useState, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import Button from './Button';
import Card from './Card';

const TaskManager = () => {
  const [tasks, setTasks] = useLocalStorage('tasks', []);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all'); // all, active, completed

  // Add new task
  const handleAddTask = (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    const newTask = {
      id: Date.now(),
      text: inputValue,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    setTasks([...tasks, newTask]);
    setInputValue('');
  };

  // Toggle task completion
  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // Delete task
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Filter tasks
  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true; // 'all'
  });

  // Task statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const activeTasks = totalTasks - completedTasks;

  return (
    <div className="space-y-6">
      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="text-center">
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{totalTasks}</p>
          <p className="text-gray-600 dark:text-gray-400">Total Tasks</p>
        </Card>
        <Card className="text-center">
          <p className="text-3xl font-bold text-green-600 dark:text-green-400">{completedTasks}</p>
          <p className="text-gray-600 dark:text-gray-400">Completed</p>
        </Card>
        <Card className="text-center">
          <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">{activeTasks}</p>
          <p className="text-gray-600 dark:text-gray-400">Active</p>
        </Card>
      </div>

      {/* Add Task Form */}
      <Card title="Add New Task">
        <form onSubmit={handleAddTask} className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter a new task..."
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                     bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button type="submit" variant="primary">
            Add Task
          </Button>
        </form>
      </Card>

      {/* Filter Buttons */}
      <Card>
        <div className="flex gap-2 flex-wrap">
          <Button 
            variant={filter === 'all' ? 'primary' : 'secondary'}
            onClick={() => setFilter('all')}
          >
            All ({totalTasks})
          </Button>
          <Button 
            variant={filter === 'active' ? 'primary' : 'secondary'}
            onClick={() => setFilter('active')}
          >
            Active ({activeTasks})
          </Button>
          <Button 
            variant={filter === 'completed' ? 'primary' : 'secondary'}
            onClick={() => setFilter('completed')}
          >
            Completed ({completedTasks})
          </Button>
        </div>
      </Card>

      {/* Task List */}
      <Card title={`${filter.charAt(0).toUpperCase() + filter.slice(1)} Tasks`}>
        {filteredTasks.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400 py-8">
            No tasks found. Add one above!
          </p>
        ) : (
          <div className="space-y-3">
            {filteredTasks.map(task => (
              <div
                key={task.id}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 
                         rounded-lg hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-center gap-3 flex-1">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <span className={`flex-1 ${task.completed ? 'line-through text-gray-500 dark:text-gray-500' : 'text-gray-800 dark:text-white'}`}>
                    {task.text}
                  </span>
                </div>
                <Button
                  variant="danger"
                  onClick={() => deleteTask(task.id)}
                  className="ml-2"
                >
                  Delete
                </Button>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export default TaskManager;