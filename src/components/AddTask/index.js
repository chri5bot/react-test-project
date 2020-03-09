import React, { useState, useCallback } from "react";
import { Form } from "semantic-ui-react";
import PropTypes from "prop-types";

import { apiCreate, useMedia } from "../../core";

const AddTask = ({ userId, tasks, setTasks }) => {
  const [text, setText] = useState("");
  const isMobile = useMedia(767);

  const handleNewTask = useCallback(e => {
    const {
      target: { value }
    } = e;
    e.persist();
    setText(value);
  }, []);

  const handleAddTask = useCallback(() => {
    const newTask = {
      id: `t_${tasks.length + 1}_u_${userId}`,
      userId,
      title: text,
      completed: false
    };

    apiCreate("todos", newTask);
    setTasks(val => [newTask, ...val]);
  }, [setTasks, tasks, userId, text]);

  return (
    <Form onSubmit={text !== "" ? handleAddTask : null}>
      <Form.Group
        style={
          isMobile
            ? {
                flexDirection: "column",
                alignItems: "center"
              }
            : { justifyContent: "center" }
        }
      >
        <span style={{ fontSize: "1em", margin: "auto 0" }}>
          {tasks.length} tasks
        </span>
        <Form.Input
          style={
            isMobile
              ? { width: "90%", minWidth: 300, margin: "0.5rem 0" }
              : { width: 600 }
          }
          onChange={handleNewTask}
          value={text}
          placeholder="New task"
        />
        <Form.Button content="Add task" />
      </Form.Group>
    </Form>
  );
};
AddTask.propTypes = {
  userId: PropTypes.number.isRequired,
  tasks: PropTypes.array.isRequired,
  setTasks: PropTypes.func.isRequired
};

export default AddTask;
