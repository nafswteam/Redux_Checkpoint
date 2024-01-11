/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { Empty } from "antd";
import Task from "./Task";

const ListTask = () => {
	// Destructure the 'todoList' from the Redux state using the useSelector hook.
	// This allows us to access the current array of todoList items from the todoSlice.
	const { todoList } = useSelector((state) => state.todo);

	// Create a new array named 'sortTodoList' that is a sorted copy of 'todoList'.
	// The sorting is based on the 'timeCreated' property of each todo item,
	// arranging them in descending order from the most recently created to the least recently created.
	const sortTodoList = [...todoList];
	sortTodoList.sort(
		(a, b) => new Date(b.timeCreated) - new Date(a.timeCreated)
	);

	return (
		<div>
			{/* Render the todo tasks based on the sorted todo list. 
      If there are sorted todos, map through the list and render Task components for each todo.
      If there are no todos or the list is empty, display a message indicating no todo tasks are found. */}

			{sortTodoList && sortTodoList.length > 0 ? (
				sortTodoList.map((todo) => <Task key={todo.id} todo={todo} />)
			) : (
				<div className="grid place-content-center text-lg text-red-400">
					<Empty
						description={false}
						className="stroke-red-100 stroke-2"
					/>
					No todo tasks found
				</div>
			)}
		</div>
	);
};
export default ListTask;
