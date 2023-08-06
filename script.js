document.getElementById("clearData").onclick = (e) => {
  e.preventDefault()
  alert("Cacher or Data Has Cleared !")
  setTimeout(() => {
    localStorage.clear()
    location.reload()
  }, 1000);
}

const getUSer = document.getElementById("username"),
  addUser = document.getElementById("addUser"),
  showUser = document.getElementById("showUser"),
  formTask = document.querySelector(".formtask");

let get = localStorage.getItem("user"),
  response = document.createElement("span"),
  formUser = document.querySelector(".formuser"),
  message = {
    success: "Data Success To Added",
    err: "Data Can't Added",
    empty: "Input Can't Empty ! Try Again",
    reached: "Can't Less Than 6 Words !",
  };
console.log(get)
if (!getUSer || get !== null) {
  showUser.textContent = `Welcome Back ${get} <3`;
  document.querySelector(".formuser").style.display = "none";
  formTask.style.display = "block";
} else {
  document.querySelector(".formuser").style.display = "block";
  formTask.style.display = "none";
}

response.style.color = "red";
addUser.addEventListener("click", (e) => {
  e.preventDefault();
  if (getUSer.value === "") {
    response.textContent = message.empty;
    formUser.parentNode.insertBefore(response, formUser);
    setTimeout(() => {
      response.textContent = "";
    }, 1500);
  } else {
    localStorage.setItem("user", getUSer.value);
    formUser.style.display = "none";
    let get = localStorage.getItem("user");
    showUser.textContent = `Sure, Your Name is : ${get}`;
    setTimeout(() => {
      showUser.textContent = `Let's Create Your Task ${get} <3`;
      formTask.style.display = "block";
    }, 1500);
  }
});

const inputTask = document.getElementById("inputTask"),
  inputTime = document.querySelector(".time"),
  inputDate = document.querySelector(".date"),
  addTask = document.getElementById("addTask");
let taskAdded = document.querySelector(".main-task");

const showTask = (task, date, time) => {
  taskAdded.innerHTML += `
  <div id="${task}">
    <div class="mt-1 d-flex justify-content-between">
    <span>Date : ${date}</span>
    <span>Time : ${time}</span>
  </div>
  <div class="task-added w-100 mt-1 d-flex justify-content-between align-items-center p-1 rounded-3">
  <div class="col-lg-10 col-md-8 col-8 p-1">
  <span class="p-1 text-white-50" style="display:block;">${task}</span>
  <input type="text" id="input${task}" name="input${task}" class="text-white-50 col-12 p-1 me-2 rounded-2 border-0" style="outline: none; background-color: inherit; display:none;" id="inputTask" value="">
    </div>
    <div class="col-lg-2" style="white-space: nowrap;">
        <a href="" class="mx-2" id="edit" name="${task}" date="${date}" time="${time}">Edit</a>
        <a href="" class="mx-2" id="delete" name="${task}">Delete</a>
    </div>
  </div>
</div>`;
};
let newData = [],
  oldData = JSON.parse(localStorage.getItem("taskAdded"));
addTask.addEventListener("click", (e) => {
  e.preventDefault();
  if (!inputTask.value || !inputDate.value || !inputTime.value) {
    response.innerHTML = `${message.empty}<br>`;
    formUser.parentNode.insertBefore(response, formUser);
    setTimeout(() => {
      response.textContent = ``;
    }, 1500);
  } else {
    if (inputTask.value.length < 4) {
      response.innerHTML = `${message.reached}<br>`;
      formUser.parentNode.insertBefore(response, formUser);
      setTimeout(() => {
        response.textContent = ``;
      }, 1500);
    } else {
      if (oldData) {
        // let date = [];
        // oldData.forEach((x) => {
        //   date.push(x.date);
        // });
        // const getDate = date.indexOf(inputDate.value);
        // if (getDate !== -1) {
        //   inputDate.value = "";
        // }

        oldData.push({
          task: inputTask.value,
          time: inputTime.value,
          date: inputDate.value,
        });
        localStorage.setItem("taskAdded", JSON.stringify(oldData));
        showTask(inputTask.value, inputDate.value, inputTime.value);
        inputTask.value = "";
      } else {
        newData.push({
          task: inputTask.value,
          time: inputTime.value,
          date: inputDate.value,
        });
        localStorage.setItem("taskAdded", JSON.stringify(newData));
        showTask(inputTask.value, inputDate.value, inputTime.value);
        inputTask.value = "";
      }
    }
  }
});
if (oldData !== null) {
  oldData.forEach((x) => {
    showTask(x.task, x.date, x.time);
  });
}

const editTask = document.querySelectorAll("#edit"),
  deleteTask = document.querySelectorAll("#delete");

//
const deleted = (x) => {
  let index = 0;
  for (let i = index; i < oldData.length; i++) {
    if (oldData[i].task === x) {
      index = i;
    }
  }

  if (index !== -1) {
    oldData.splice(index, 1);
    localStorage.setItem("taskAdded", JSON.stringify(oldData));
    const getClass = document.querySelector(`#${x}`);
    getClass.style.display = "none";
  }
};

const edited = (x, y) => {
  console.log(y);
  let index = 0;
  if (x.id === "edit") {
    y.previousElementSibling.textContent = y.value;
    y.previousElementSibling.style.display = "block";
    y.style.display = "none";
    for (let i = index; i < oldData.length; i++) {
      if (oldData[i].task === x.name) {
        index = i;
      }
    }
    if (index !== -1) {
      oldData[index].task = y.value;
      localStorage.setItem("taskAdded", JSON.stringify(oldData));
      y.value = "";
    }
  }
};
let condition = true;
const changeCondition = (x) => {
  if (condition) {
    x.textContent = "Save";
    x.id = "saveTask";
    condition = false;
  } else {
    condition = true;
    x.textContent = "Edit";
    x.id = "edit";
  }
};

//
for (let i = 0; i < deleteTask.length; i++) {
  deleteTask[i].addEventListener("click", (x) => {
    x.preventDefault();
    deleted(deleteTask[i].name);
  });
}

for (let i = 0; i < editTask.length; i++) {
  editTask[i].addEventListener("click", (x) => {
    x.preventDefault();
    let getName = editTask[i].getAttribute("name"),
      edit = document.getElementById(`input${getName}`);
    edit.style.display = "block";
    edit.previousElementSibling.style.display = "none";
    changeCondition(editTask[i]);
    edited(editTask[i], edit);
  });
}
