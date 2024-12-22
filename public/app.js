  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js";
  import { getDatabase, ref, push, set, onChildAdded, remove } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";

  const firebaseConfig = {
    apiKey: "AIzaSyBWZHEUE_78w3E_dFfUzSCuTguMBPeoSWE",
    authDomain: "test-3bca8.firebaseapp.com",
    databaseURL: "https://test-3bca8-default-rtdb.firebaseio.com",
    projectId: "test-3bca8",
    storageBucket: "test-3bca8.firebasestorage.app",
    messagingSenderId: "839934405516",
    appId: "1:839934405516:web:8c9b935d46c6f358e384a9",
    measurementId: "G-EV4GNB820C"
  };

  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const database = getDatabase(app);

  const taskInput = document.getElementById("taskInput");
  const addTaskButton = document.getElementById("addTaskButton");
  const taskList = document.getElementById("taskList");

  addTaskButton.addEventListener("click", function() {
    const taskValue = taskInput.value.trim();

    if (taskValue) {
      const taskRef = ref(database, 'tasks');
      const newTaskRef = push(taskRef);
      set(newTaskRef, {
        task: taskValue,
        completed: false
      });

      const li = document.createElement("li");
      li.textContent = taskValue;

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.classList.add("deleteButton");

      deleteButton.addEventListener("click", function() {
        taskList.removeChild(li);
        remove(newTaskRef); 
      });

      li.appendChild(deleteButton);
      taskList.appendChild(li);

      taskInput.value = ""; 
    } else {
      alert("Please enter a task.");
    }
  });

  const tasksRef = ref(database, 'tasks');
  onChildAdded(tasksRef, function(snapshot) {
    const taskData = snapshot.val();
    const li = document.createElement("li");
    li.textContent = taskData.task;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("deleteButton");

    deleteButton.addEventListener("click", function() {
      taskList.removeChild(li);
      remove(snapshot.ref); 
    });

    li.appendChild(deleteButton);
    taskList.appendChild(li);
  });