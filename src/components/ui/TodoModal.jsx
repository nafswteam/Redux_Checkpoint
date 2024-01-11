/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo, editTodo } from "../../features/todo/todoSlice";
import { nanoid } from "@reduxjs/toolkit";
import validator from "validator";
import { Select, Modal, Input, message } from "antd";

const TodoModal = ({
  visible,
  setIsModalOpen,
  title,
  todo,
  modalActionButton,
}) => {
  const [description, setDescription] = useState(todo?.description || "");
  const [isDone, setIsDone] = useState(todo?.isDone || false);
  const [messageApi, contextHolder] = message.useMessage();

  const dispatch = useDispatch(); // dispatch some action from our todoSlice

  const handleCancel = () => {
    if (title.toLowerCase().includes("update")) {
      // If the modal title contains "update", retrieve the original todo descriptin and set it to the input filed values
      setDescription(todo?.description);
      setIsDone(todo?.isDone);
      setIsModalOpen(false);
      return;
    }
    // For other cases, reset the modal fields and close the modal.
    setDescription("");
    setIsDone(false);
    setIsModalOpen(false);
  };

  // Handles the confirm action for the modal.
  const handleOk = () => {
    if (description) {
      if (title.toLowerCase().includes("update")) {
        // If the title includes 'update', dispatch editTodo action with updated values and close the modal.
        dispatch(
          editTodo({
            ...todo,
            id: todo.id,
            description,
            isDone,
          })
        );

        setIsModalOpen(false); // close the modal
        return;
      }

      // If adding a new todo, dispatch addTodo action with new values.
      dispatch(
        addTodo({
          id: nanoid(),
          description,
          isDone,
          timeCreated: new Date().toLocaleString(),
        })
      );
    }

    if (validator.isEmpty(description) || /^\s*$/.test(description)) {
      messageApi.open({
        type: "error",
        content: "Please provide a todo Task",
      });
      return;
    }

    messageApi.open({
      type: "success",
      content: "Todo Task added successfully",
    });
    setDescription(" ");
    setIsModalOpen(false); // close the modal
  };

  return (
    <>
      <Modal
        title={`${title} Todo Task`}
        onOk={handleOk}
        onCancel={handleCancel}
        open={visible}
        okText={modalActionButton}
        focusTriggerAfterClose={false}
        maskClosable={false}
      >
        {contextHolder}
        <div className="space-y-2 text-xl">
          <label className="text-lg">Title</label>
          <Input
            placeholder="Write your task here"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="grid space-y-2 my-4">
          <label>Status</label>
          <Select
            className="w-full"
            size="large"
            defaultValue={false}
            id="isDone"
            value={isDone}
            onChange={(value) => setIsDone(value)}
            options={[
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
      </Modal>
    </>
  );
};
export default TodoModal;
