// import Header from "./components/Header";
// import Body from "./components/Body";
// import Form from "./components/Form";
// import TaskList from "./components/TaskList";
// import "bootstrap/dist/css/bootstrap.min.css";

// import { useState, useEffect } from "react";

// const App = () => {
//   const [taskList, setTaskList] = useState([""]);

//   useEffect(() => {
//     console.log("abc");
//     const fetchTasks = async () => {
//       try {
//         const response = await fetch("http://127.0.0.1:3000/getTask");
//         if (response.ok) {
//           const data = await response.json();
//           setTaskList(data);
//         } else {
//           console.error("Failed to fetch tasks");
//         }
//       } catch (error) {
//         console.error("Error:", error);
//       }
//     };

//     fetchTasks();
//   }, []);

//   return (
//     <>
//       <Header>Task Go....</Header>
//       <Body>
//         <Form  taskList={taskList} setTaskList={setTaskList}></Form>
//         <TaskList taskList={taskList} setTaskList={setTaskList}></TaskList>
//       </Body>
//     </>
//   );
// };

// export default App;


import Header from "./components/Header";
import Body from "./components/Body";
import Form from "./components/Form";
import TaskList from "./components/TaskList";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";

const App = () => {
  const [taskList, setTaskList] = useState([]);

  const fetchTasks = async () => {
    try {
      const response = await fetch("http://127.0.0.1:3000/getTask");
      if (response.ok) {
        const data = await response.json();
        setTaskList(data);
      } else {
        console.error("Failed to fetch tasks");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <>
      <Header>Task Go....</Header>
      <Body>
        <Form taskList={taskList} setTaskList={setTaskList} fetchTasks={fetchTasks} />
        <TaskList taskList={taskList} setTaskList={setTaskList} />
      </Body>
    </>
  );
};

export default App;
