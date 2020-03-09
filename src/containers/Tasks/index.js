import React, { useState, useCallback, useEffect } from "react";
import { Container, Header, Segment, Icon } from "semantic-ui-react";

import {
  apiGetData,
  apiDelete,
  useAuth,
  useLoggedIn,
  hasLength,
  CircularLoader
} from "../../core";
import AddTask from "../../components/AddTask";
import TaskItem from "../../components/TaskItem";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const {
    state: { user }
  } = useAuth();

  useLoggedIn();

  const handleGetData = useCallback(async () => {
    const getTasks = user && (await apiGetData(`todos?userId=${user.id}`));
    if (hasLength(getTasks)) setTasks(getTasks.reverse());
  }, [user]);

  const handleDeleteTask = useCallback(
    taskId => async () => apiDelete(`todos?userId=${user.id}&id=${taskId}`),
    [user]
  );

  useEffect(() => {
    handleGetData();
  }, [handleGetData]);

  if (!hasLength(tasks)) return <CircularLoader />;

  return (
    <Container
      style={{
        minHeight: "75vh",
        display: "flex",
        flexDirection: "column",
        marginBottom: "2rem"
      }}
    >
      <Header as="h2" style={{ padding: "3rem", textAlign: "center" }}>
        Your tasks
      </Header>
      <AddTask userId={user && user.id} tasks={tasks} setTasks={setTasks} />
      {hasLength(tasks) &&
        tasks.map(({ id, title, completed }) => (
          <Segment key={id} style={{ display: "flex" }}>
            <TaskItem
              query={`todos?userId=${user.id}&id=${id}`}
              isChecked={completed}
              title={title}
            />
            <Icon
              style={{ height: "100%", cursor: "pointer" }}
              onClick={handleDeleteTask(id)}
              size="large"
              name="close"
            />
          </Segment>
        ))}
    </Container>
  );
};

export default Tasks;
