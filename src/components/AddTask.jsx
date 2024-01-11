/* eslint-disable react/prop-types */
import { Button, Select } from "antd";
import TodoModal from "./ui/TodoModal";
import { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { filterTodo } from "../features/todo/todoSlice";
import { PlusCircleOutlined } from "@ant-design/icons";
import { FilterContext } from "../App";

const AddTask = () => {
	const { filterIsDone, setFilterIsDone } = useContext(FilterContext);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const dispatch = useDispatch();

	const showModal = () => {
		setIsModalOpen(true);
	};

	/**
	 * Handles changes in the todo filter value.
	 * value - is the new filter value indicating whether todos is done or not.
	 */
	function handleFilterChange(value) {
		// Update the state to reflect the new filter value
		setFilterIsDone(value);
		// Dispatch an action to update the todo list with the new filter value
		dispatch(filterTodo({ isDone: value }));
	}

	return (
		<div className="flex items-center justify-between p-4 mx-2 my-8 sm:mx-4">
			{/* Add Task button that appears on the UI to enable user initiates a addtodo task */}
			<Button
				type="primary"
				className="bg-purple-600"
				onClick={showModal}
				onKeyDown={showModal}
			>
				<PlusCircleOutlined />
				Add Task
			</Button>

			{/* Select with options for user to filter todo task based on isDone/not status */}
			<div className="align-middle">
				<span className="text-xl mx-2 text-slate-500 align-middle">
					Filter:
				</span>
				<Select
					placeholder="All Task"
					size="middle"
					id="isDone"
					value={filterIsDone}
					defaultValue="All"
					onChange={handleFilterChange}
					options={[
						{
							value: "All Todo Task",
							label: "All Todo Task",
						},
						{
							value: false,
							label: "Pending",
						},
						{
							value: true,
							label: "Completed",
						},
					]}
				/>
			</div>

			{/* Use the TodoModal component -->
        Render a TodoModal component with the following props: 
      `visible`: Controls the visibility of the modal, derived from the state `isModalOpen`.  
      `setIsModalOpen`: Callback function to update the `isModalOpen` state and control modal visibility. 
      `title`: Specifies the title of the modal, indicating it's intended for Add a todo task.  
      */}
			<TodoModal
				visible={isModalOpen}
				title={"Add"}
				setIsModalOpen={setIsModalOpen}
				modalActionButton={"Add Task"}
			/>
		</div>
	);
};

export default AddTask;
