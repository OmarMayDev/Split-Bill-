let manyppl = document.getElementById("number");
let nameOfBill = document.getElementById("go");
let taskName = document.getElementById("taskName");
let minus = document.getElementById("minus");
const plus = document.getElementById("plus");
const form = document.getElementById("s1InnerBox3Content");
const min = 2;
const max = 40;

manyppl.defaultValue = 3;

// manyppl.value = 3;
// page1;
// minus and plus
minus.addEventListener("click", () => {
  if (manyppl.value <= min) {
  } else {
    manyppl.value--;
  }
});

plus.addEventListener("click", () => {
  if (manyppl.value >= max) {
  } else {
    manyppl.value++;
  }
});

// form
form.addEventListener("submit", (event) => {
  event.preventDefault();
  let userValue = manyppl.value;
  let userTask = taskName.value;

  localStorage.setItem("userValue", userValue.toString());
  localStorage.setItem("userTask", userTask);

  if (userValue < 2 || userValue > 40) {
    {
      return alert("Have to input at least 2 people with a max of 40 people");
    }
  }

  if (userTask === "") {
    return alert("Must have a task name");
  }
  window.location.href = "index2.html";
});
