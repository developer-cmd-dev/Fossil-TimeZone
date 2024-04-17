
console.log("Project 1")

let displayHour = document.getElementById('hour')
let displayMinute = document.getElementById('minute')
let displaySecond = document.getElementById('second')
let timeZone = document.getElementById('timeZone')
let toggleTimeFormat = document.getElementById('toggleTimeFormat')
let day = document.getElementById('week')
let date = document.getElementById('date')
let month = document.getElementById('month')
let year = document.getElementById('year')
let weekArr = ['Monday', 'Tuesday', 'Wednesday', 'Thrusday', 'Friday', 'Saturday', 'Sunday']
let monthArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
let timePeriod = document.getElementById('am/pm')
let alert = document.getElementById('alert')




// digital Clock program

let digitalClock = () => {
    setInterval(() => {
        let dateTime = new Date()
        let obj={
            hour:dateTime.getHours(),
            minute:dateTime.getMinutes(),
            second:dateTime.getSeconds()
        }
        analogClock(obj.second, obj.minute, obj.hour)
        toggle(obj.hour, obj.minute, obj.second)
        // ringAlarm(hour, minute)
        displayMinute.innerText = obj.minute;
        displaySecond.innerText = obj.second;
        day.innerText = weekArr[dateTime.getDay() - 1]
        date.innerText = dateTime.getDate()
        month.innerText = monthArr[dateTime.getMonth()]
        year.innerText = dateTime.getFullYear()
        if (hour == 12 && second > 0) {
            timeZone.innerText = 'Pm'
        } else {
            timeZone.innerText = 'Am'
        }


    }, 1000);


    let toggle = (hour) => {
        if (toggleTimeFormat.value === 'false') {
            displayHour.innerText = hour
        } else {
            if (hour > 12) {
                displayHour.innerText = hour - 12
            } else {
                displayHour.innerText = hour;
            }
        }
    }

}


digitalClock()
let timeFormate = () => {
    if (toggleTimeFormat.value == "true") {
        toggleTimeFormat.value = "false";
        console.log(toggleTimeFormat.value)
    } else {
        toggleTimeFormat.value = "true"
        console.log(toggleTimeFormat.value)
    }
}




let digitalClockPage = document.getElementById('DigitalClock')
let weatherPage = document.getElementById('Weather')
let analogPage = document.getElementById('AnalogClock')
let pageSwitches = document.getElementsByClassName('navButtons')
let pageSwitches2 = document.getElementsByClassName('pageSwitches')
let pages = document.getElementsByClassName('pages')


// Page Switches

// Iterate over each element in the pageSwitches NodeList and attach a click event listener to it
Array.from(pageSwitches).forEach((element) => {
    element.addEventListener('click', () => {
        // Call pageSwitchFunc passing the clicked element
        
        pageSwitchFunc(element)
    })
})


// Function to switch pages or elements based on the clicked element
let pageSwitchFunc = (e) => {
    // Log the ID of the clicked element
    // Initialize an empty array to store IDs of pageSwitches2 elements
    let arr = [];
    // Initialize variables for index and element array
    let index;
    let elementArr = []

    // Iterate over each element in the pageSwitches2 NodeList
    Array.from(pageSwitches2).forEach((element) => {
        // Push the ID of each element into the arr array
        arr.push(element.id)

        // Find the index of the clicked element's ID in the arr array
        index = arr.indexOf(e.id)

        // Push each element into the elementArr array
        elementArr.push(element)

        // If the ID of the current element does not match the clicked element's ID
        if (element.id != e.id) {
            // Hide the element
            element.style.display = "none"
        } else {
            // If the ID matches, display the element
            elementArr[index].style.display = "block" // Note: "block" corrected from "Block" to match CSS
        }
    })
}



// Analog Clock

// Access the html elements representing the clock hands.
let secondHand = document.getElementById('secondHand')
let minuteHand = document.getElementById('minuteHand')
let hourHand = document.getElementById('hourHand')

let analogClock = (second, minute, hour) => {
    // Calculate adjustment for minute and hour hands
    let num1 = second / 10
    let num2 = minute / 2

    // Calculate rotations angles for each clock hand
    let secondDeg = second * 6 // 6 degrees per second
    let minuteDeg = minute * 6 + num1 // 6 degrees per minute, adjusted by seconds
    let hourDeg = hour * 30 + num2; //30 degrees per hour, adjusted by minutes.

    // Update css rotation for each clock hand.
    secondHand.style.rotate = `${secondDeg}deg`
    minuteHand.style.rotate = `${minuteDeg}deg`
    hourHand.style.rotate = `${hourDeg}deg`
}


// To-Do-List
let inputTask = document.getElementById('taskInput')
let addTaskButton = document.getElementById('addTaskButton')
let savedTask = document.getElementById('savedTask')
let todoWeek = document.getElementById('todoWeek')
let todoDate = document.getElementById('todoDate')
let todoMonth = document.getElementById('todoMonth')
let todoArr = [] //Storing saved toDo list length in array.
let localStoragekeys= []


// Created class for append todo content in html...and if website will referesh then the data will not lost for user.
class ToDoClass {
    userData() { //The todo content using html.
        savedTask.innerHTML += `<h1  class="savedItem border my-2 bg-slate-200 w-full p-5 rounded-md flex justify-between"> <div> <i class="fa-regular fa-circle mx-2" ></i>${this.data}</div><div class=" w-12 flex justify-between items-center"><i value="1" class="deleteTodo cursor-pointer fa-solid fa-trash"></i><i class="fa-regular fa-star"></i></div></h1>`;
    }
    givenData(data) { //Taking data form Todo function
        this.data = data;

    }
}


let getDataFromLocalStorage = new ToDoClass()
// Putting Class value in this variable.
let toDo = () => {
  addTaskButton.addEventListener('click', () => {
        // todoArr.push(todoArr.length)           //Saving ids for each todo work in this array.
        if (inputTask.value === '') {    //Condition if input field is empty then user does not save the todo work.
            console.error("Please fill the input field")  //Console the error.
            alert.style.display = 'block';  //Display the error for user to see.
            setTimeout(() => {
                alert.style.display = 'none' //Popping the error
                alert.firstElementChild.innerText = "Please Write your todoArr!"
            }, 3000);
        } else {
            todoArr.push(inputTask.value)
             localStorage.setItem(todoArr.length, todoArr[todoArr.length-1]) //Saving user todo data in local storage.
    inputTask.value = ""//After saving the input field will empty for new todo.
    //Getting user data from local storage and sending the data in class.
    getDataFromLocalStorage.givenData(localStorage.getItem(todoArr.length))
    getDataFromLocalStorage.userData() //Called function from the class


        }
        removeTodo()

    })


for (let i = 0; i < localStorage.length; i++) {  //Looping for showing data after refresh the site.
    localStoragekeys.push(Number.parseInt(localStorage.key(i)))
 localStoragekeys.sort()
}

    
for(let i=0;i<localStorage.length;i++){
    todoArr.push(localStorage.getItem(localStoragekeys[i].toString())) //Pushing i value in todoArr array.
  
    getDataFromLocalStorage.givenData(todoArr[i]) //Getting data from local storage and sending in class.
    getDataFromLocalStorage.userData()//Calling class function.
}


}



let deleteTodo = document.getElementsByClassName('deleteTodo')
let savedItem = document.getElementsByClassName('savedItem')
let deleteTodoConfirmation = document.getElementById('todoDeleteConfirmation')

let confirmationYes = document.getElementById('confirmationYes')
let confirmationNo = document.getElementById('confirmationNo')


let removeTodo = () => {  //Created the delete function for todo.
    for (let i = 0; i < deleteTodo.length; i++) { //Printing all todo items from dom.
        deleteTodo[i].addEventListener('click', (e) => {  //click event in delete icon.
            e.target.parentNode.parentNode.remove() //Deleting specific todo item which will select by the user.
            localStorage.removeItem(`${localStoragekeys[i]}`)
        })
    }
}
toDo()
removeTodo()


let searchTodo = document.getElementById('searchTodo')
let searchValue = searchTodo.value
searchTodo.addEventListener('input', () => {
    Array.from(savedItem).forEach((element) => {
       
        if (element.firstElementChild.innerText.includes(searchTodo.value)) {
            element.style.display = "flex"
    
        } else {
            element.style.display = "none"
        
        }
    })
})












