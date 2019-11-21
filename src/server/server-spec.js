import { addNewTask, updateTask } from "./server";

(async function taskFunctions() {
  await addNewTask({
    name: "tester",
    id: "T144",
    owner: "U03"
  });

  await updateTask({
    id: "T144",
    name: "Order Ice",
    owner: "U03"
  });
})();
