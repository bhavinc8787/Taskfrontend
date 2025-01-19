import { useContext, useState, useEffect } from "react";
import { TaskContext } from "../context/TaskContext";
import { useNavigate, useParams } from "react-router-dom";

const TaskManagementPage = () => {
    const { tasks, addTask, updateTask, deleteTask } = useContext(TaskContext);
    const navigate = useNavigate();
    const { taskId } = useParams();

    const [newTask, setNewTask] = useState({ title: '', description: '' });
    const [task, setTask] = useState({ title: '', description: '', status: '' });
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [filteredTasks, setFilteredTasks] = useState([]);

    useEffect(() => {
        if (taskId) {
            const foundTask = tasks.find(t => t._id === taskId);
            if (foundTask) {
                setTask(foundTask);
            } else {
                alert("Task not found!");
                navigate('/tasks');
            }
        }
    }, [taskId, tasks]);

    const handleAddTask = () => {
        if (!newTask.title || !newTask.description) {
            return alert("Please fill out the task title and description.");
        }
        addTask(newTask.title, newTask.description);
        setNewTask({ title: '', description: '' });
    };

    const handleSubmit = () => {
        if (!task.title || !task.description) {
            return alert("Please fill out the task title and description.");
        }

        updateTask(task._id, {
            title: task.title,
            description: task.description,
            status: task.status,
        });
        alert("Task updated successfully!");
        navigate('/tasks');
    };

    useEffect(() => {
        setFilteredTasks(
            tasks.filter((task) => {
                const matchesSearch =
                    task.title.toLowerCase().includes(search.toLowerCase()) ||
                    task.description.toLowerCase().includes(search.toLowerCase()) ||
                    task._id.toLowerCase().includes(search.toLowerCase());

                const matchesStatus =
                    statusFilter ? task.status === statusFilter : true;

                return matchesSearch && matchesStatus;
            })
        );
    }, [search, tasks, statusFilter]);

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-8 mt-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Create Task Section */}
                <div className="bg-white p-6 rounded-lg shadow-md lg:col-span-1">
                    {!taskId && (
                        <>
                            <h3 className="text-2xl font-semibold mb-4 text-blue-600">Create New Task</h3>
                            <input
                                type="text"
                                placeholder="Task Title"
                                value={newTask.title}
                                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                                className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            <input
                                type="text"
                                placeholder="Task Description"
                                value={newTask.description}
                                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                                className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            <button
                                onClick={handleAddTask}
                                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
                            >
                                Add Task
                            </button>
                        </>
                    )}
                </div>

                {/* Right Side Section (Search, Filters, Task List) */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex flex-col lg:flex-row justify-between items-center mb-4">
                        <input
                            type="text"
                            placeholder="Search by ID, Title, Description..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full lg:w-3/4 p-3 mb-4 lg:mb-0 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <div className="w-full lg:w-1/4">
                            {/* Filter by Status */}
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            >
                                <option value="">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>
                    </div>

                    {/* Task List Section */}
                    <div>
                        <h3 className="text-2xl font-semibold text-blue-600 mb-4">Task List</h3>
                        <ul className="space-y-4">
                            {filteredTasks.map((task) => (
                                <li key={task._id} className="bg-white p-4 rounded-lg shadow-md flex flex-col sm:flex-row justify-between items-center">
                                    <div>
                                        <p className="font-semibold text-lg">{task.title}</p>
                                        <p className="text-sm text-gray-500">{task.description}</p>
                                        <span className={`inline-block mt-2 px-3 py-1 text-sm rounded-full ${task.status === 'completed' ? 'bg-green-200 text-green-600' : 'bg-yellow-200 text-yellow-600'}`}>
                                            {task.status}
                                        </span>
                                    </div>
                                    <div className="space-y-2 sm:space-y-0 sm:space-x-2 sm:flex sm:flex-row">
                                        <button
                                            onClick={() => updateTask(task._id, {
                                                title: task.title,
                                                description: task.description,
                                                status: task.status === 'completed' ? 'pending' : 'completed'
                                            })}
                                            className="px-4 py-2 text-sm bg-gray-300 rounded-lg hover:bg-gray-400 transition duration-300 w-full sm:w-auto"
                                        >
                                            {task.status === 'completed' ? 'Mark as Pending' : 'Mark as Completed'}
                                        </button>
                                        <button
                                            onClick={() => deleteTask(task._id)}
                                            className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300 w-full sm:w-auto"
                                        >
                                            Delete
                                        </button>
                                        <button
                                            onClick={() => navigate(`/tasks/edit/${task._id}`)}
                                            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 w-full sm:w-auto"
                                        >
                                            Edit
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskManagementPage;
