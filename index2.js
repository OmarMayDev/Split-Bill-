localStorage.getItem("userValue");
localStorage.getItem("userTask");
let counterRe = 0;

let amountOfUsers = localStorage.getItem("userValue");
let taskOfName = localStorage.getItem("userTask");

//task name under Logo
let taskk = document.getElementById("userName");
taskk.innerHTML = taskOfName;

//make boxes this makes boxes based on the usernumber of ppl
let usersBox = document.querySelector(".personBox");
let usersBoxHolder = document.getElementById("conLeft");

for (let i = 1; i < amountOfUsers; i++) {
  let cloneUsersBox = usersBox.cloneNode(true);
  usersBoxHolder.appendChild(cloneUsersBox);
}

//right side changes
let con1 = document.getElementById("conRightCon1");
let con2 = document.getElementById("conRightCon2");
let con3 = document.getElementById("conRightCon3");
let con4 = document.getElementById("conRightCon4");
let inputs = document.querySelectorAll("input");
let inputName = document.getElementById("nameInput");

//send amounts to amount holder
function amountSender() {
  let inputsBox = document.querySelectorAll(".con2Box2");
  let inputsBoxArray = Array.from(inputsBox);

  inputsBoxArray.forEach((input) => {
    input.addEventListener("input", () => {
      //throw all the sepreate values into their own arrays to add
      const boxItsIn = input.closest(".personBox");
      const allInBoxInputs = boxItsIn.querySelectorAll(".con2Box2");
      const allInBoxInputsArray = Array.from(allInBoxInputs).map(
        (ele) => ele.value
      );

      //reduce all inputs into a single value
      let reduced = allInBoxInputsArray.reduce(
        (accumulator, currentValue) =>
          parseFloat(accumulator) + parseFloat(currentValue)
      );

      const valueToChange = boxItsIn.querySelector(".price");
      valueToChange.innerHTML = reduced;
    });
  });
}

amountSender();

//declare form for whole page
let fe = document.getElementById("pprt3Content");
const userData = [];
inputs.forEach((input) => {
  input.addEventListener("input", () => {
    con1.style.display = "none";
    con2.style.display = "flex";
    conRightCon4.style.display = "none";
  });
});
//solve the math for who owes who

fe.addEventListener("submit", (event) => {
  event.preventDefault();

  // Get all elements with the class
  const con2Box1Inputs = document.querySelectorAll(".con2Box1");
  const con2Box2Inputs = document.querySelectorAll(".con2Box2");
  const usersNames = document.querySelectorAll(".nameInput");
  const allInputs = document.querySelectorAll("input");
  const allinputs2 = Array.from(allInputs);
  const conRightCon4 = document.getElementById("conRightCon4");

  allinputs2.forEach((input) => {
    if (input.value === "") {
      con2.style.display = "none";
      conRightCon4.style.display = "block";
      display3.style.display = "none";
    }
  });

  // Loop through each input and log its value
  con2Box1Inputs.forEach((input) => {});

  con2Box2Inputs.forEach((input) => {});

  usersNames.forEach((input) => {});

  const forEachBox = document.querySelectorAll(".personBox");
  const eachBoxes = Array.from(forEachBox);
  //declare everything inside
  eachBoxes.forEach((box, index) => {
    //you can query the box!!
    const tasks = Array.from(box.querySelectorAll(".con2Box1")).map(
      (input) => input.value
    );
    const amounts = Array.from(box.querySelectorAll(".con2Box2")).map(
      (input) => input.value
    );
    const name = box.querySelector(".nameInput").value;

    userData[`Box ${index + 1}`] = {
      name: name,
      tasks: tasks,
      amounts: amounts,
    };
  });

  function solveWhoOwesWho() {
    //perfom the math of who owes who based on userdata
    //get toatal amount of boxes
    let boxes = document.querySelectorAll(".personBox");
    let boxesCount = Array.from(boxes);
    let totalBoxes = boxesCount.length;

    //get total amount added from eveyone combined
    let totals = document.querySelectorAll(".price");
    let totalsArray = Array.from(totals).map((ele) => ele.innerHTML);

    //do formula for adding all totals
    let allTotalAdded = totalsArray.reduce(
      (accumulator, currentValue) =>
        parseFloat(accumulator) + parseFloat(currentValue)
    );

    //step 1 Divide the total amount by the number of ppl
    let step1 = allTotalAdded / totalBoxes;

    //step 2 Take take the highest payed persons amount subtracted by the
    // the divide total to get the person who needs to be owed

    let highestpaidAmount = Math.max(...totalsArray);

    //get highest person name
    let heighestpaidPerson;
    boxesCount.find((person) => {
      let number = person.querySelector(".price");

      if (parseFloat(number.innerHTML) === highestpaidAmount) {
        let name = number.closest(".personBox").querySelector(".nameInput");

        heighestpaidPerson = name.value;
      }
    });

    // highest payed persons amount subtracted by the the divide total
    highestpaidAmount - step1;
    console.log("hfaf", hasDuplicates(totalsArray));
    //display the oweDiv
    let display3 = document.getElementById("conRightCon3");
    display3.style.display = "block";
    con2.style.display = "none";
    //declare box to send data
    let dataBox = document.getElementById("rightCon3Box1");
    //exculde the highest person he is the one owed
    //than take the divide total again and subtract
    // it by other ppl amounts to see what they owe
    let peopleWhoOwe;
    boxesCount.filter((box) => {
      let number = box.querySelectorAll(".price");

      number.forEach((number) => {
        if (parseFloat(number.innerHTML) < highestpaidAmount) {
          let name = number.closest(".personBox").querySelector(".nameInput");

          peopleWhoOwe = name.value;
          let theirAmount = name.closest(".personBox").querySelector(".price");
          //check if name is same
          if (name.value === heighestpaidPerson) {
            con2.style.display = "none";
            conRightCon4.style.display = "block";
            let toChange = document.getElementById("sorry");

            display3.style.display = "none";
            toChange.innerHTML = "Names can not be the same";
          }

          let owesHowMuch = step1 - theirAmount.innerHTML;

          dataBox.insertAdjacentHTML(
            "afterend",
            `
            <div id="threeBox1inner">Who pays whom how much:</div>
              <div id="threeBox1inner2">
                <div id="userNamePay1">${name.value} <span>Pays</span>:</div>
                <div id="payAmount">${owesHowMuch}</div>
                <div id="userNamePay2">
                  <span>To</span>
                  <div id="seoncdvalue">${heighestpaidPerson}</div>
                </div>
              </div>`
          );
        }
      });
    });
  }

  solveWhoOwesWho();

  //add duplicate checker
  function hasDuplicates(arr) {
    const seen = new Set();
    for (const value of arr) {
      if (seen.has(value)) {
        con2.style.display = "none";
        conRightCon4.style.display = "block";
        display3.style.display = "none";
      }

      seen.add(value);
    }
    return false;
  }

  counterRe++;
  if (counterRe === 2) {
    location.reload();
    counterRe = 0;
  }

  //make the logic that adds the numbers and sends to total in box
});

//make the minus button work
function runTheMinus() {
  document.querySelectorAll(".minusIcon").forEach((button) => {
    button.addEventListener("click", () => {
      // Find the parent box of the button
      //closest is key!!
      const outerBox = button.closest(".boxtoClone");

      // If the outerBox exists, remove it
      if (outerBox) {
        outerBox.remove(); // This will remove the entire outerBox div
      }
    });
  });
}

//making the more button work
let moreButton1 = document.querySelectorAll(".boxcon3");
let moreButton = Array.from(moreButton1);

//box to clone
let copyDiv = document.getElementById("boxtoClone");

//box to put in
let inputsHolder1 = document.querySelectorAll(".boxcon2");
let inputsHolder = Array.from(inputsHolder1);

moreButton.forEach((button, index) => {
  button.addEventListener("click", () => {
    //have to target the index to copy only it

    let targetHolder = inputsHolder[index];
    let here = copyDiv.cloneNode(true);
    let clearOperation = here.querySelectorAll("input");

    clearOperation.forEach((input) => {
      input.value = "";
    });
    targetHolder.appendChild(here);
  });
});

moreButton.forEach((button) => {
  button.addEventListener("click", () => {
    runTheMinus();
    amountSender();
  });
});
