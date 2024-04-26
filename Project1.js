
console.log("Project 1")

let displayHour = document.getElementById('hour')
let displayMinute = document.getElementById('minute')
let displaySecond = document.getElementById('second')
let timezoneClock = document.getElementById('timeZone')
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
        
        let obj = {
            hour: dateTime.getHours(),
            minute: dateTime.getMinutes(),
            second: dateTime.getSeconds()
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
        if (obj.hour >= 12 && obj.second > 0) {
            timezoneClock.innerText = 'Pm'
        } else {
            timezoneClock.innerText = 'Am'
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
    element.classList.remove('text-white')
    element.addEventListener('click', () => {
        // Call pageSwitchFunc passing the clicked element
      
       
        element.classList.add('text-white')
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
            console.log(elementArr[index])
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


// Weather

let areaLocation = document.getElementById('location')
let tempreature = document.getElementById('tempreature')
let locationName = document.getElementById('locationName')
let searchLocationBtn = document.getElementById('searchLocationBtn')
let searchError = document.getElementById('searchError')
let apiErrorMessage = document.getElementById('apiErrorMessage')
let askLocationPage = document.getElementById('askLocation')
let weatherResultPage = document.getElementById('showWeatherResult')

searchLocationBtn.addEventListener('click',()=>{

    editApi(locationName.value)

})




let editApi = (value)=>{
    const url = `https://weather-api138.p.rapidapi.com/weather?city_name=${value}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '01ca6a8199msh68335ea786a5b1ep13000bjsn946b43a1c2d4',
            'X-RapidAPI-Host': 'weather-api138.p.rapidapi.com'
        }
    };
    weatherApi(url,options)
}


let  weatherApi= async (url,options)=>{
    try {
        const response = await fetch(url ,options);
        const result = await response.json();
      
        if(locationName.value == ''){
            console.log(locationName.value)
            searchError.classList.remove('hidden')
            searchError.innerText=`Enter City Name.`
          }else if(result.cod == 404){
       searchError.classList.remove('hidden')
       searchError.innerText=`${result.message}`
      }
      else{
          apiData(result)        
      }
      askLocationPage.classList.add('hidden')
      weatherResultPage.classList.remove('hidden')
    } catch (error) {
   console.log(error)
        
    }
    
}



let apiData = (data,error)=>{

        ({coord,weather,main,wind,clouds,timezone,sys,name,}=data)
        temp = main.temp_max - 273.15 
    areaLocation.innerText=`${name},${sys.country}`
    tempreature.innerHTML=`<h1>${temp.toFixed(0)}&deg;  C</h1>`;
    console.log(coord,weather,main,wind,clouds,timezone,sys,name)
     
    
    

   
   


}





weatherApi()








// To-Do-List
let inputTask = document.getElementById('taskInput')
let addTaskButton = document.getElementById('addTaskButton')
let savedTask = document.getElementById('savedTask')
let todoWeek = document.getElementById('todoWeek')
let todoDate = document.getElementById('todoDate')
let todoMonth = document.getElementById('todoMonth')
let todoArr = [] //Storing saved toDo list length in array.
let localStoragekeys = []


// Created class for append todo content in html...and if website will referesh then the data will not lost for user.
class ToDoClass {
    userData() { //The todo content using html.
        savedTask.innerHTML += `<h1  class="savedItem border my-2 bg-slate-200 w-full p-5 rounded-md flex justify-between"> <div class="flex items-center"> <i class="fa-regular fa-circle mx-2" ></i><p>${this.data}</p></div><div class=" w-24 flex justify-between items-center"><i id="editTodo" class="editTodo cursor-pointer fa-solid fa-pen hover:text-blue-700"></i><i value="1" class="deleteTodo cursor-pointer fa-solid fa-trash hover:text-red-600"></i><i class="fa-regular fa-star"></i></div></h1>`;
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
            localStorage.setItem(todoArr.length, todoArr[todoArr.length - 1]) //Saving user todo data in local storage.
            inputTask.value = ""//After saving the input field will empty for new todo.
            //Getting user data from local storage and sending the data in class.
            getDataFromLocalStorage.givenData(localStorage.getItem(todoArr.length))
            getDataFromLocalStorage.userData() //Called function from the class
            removeTodo()
            editTodo()
        }
       

    })


    for (let i = 0; i < localStorage.length; i++) {  //Looping for showing data after refresh the site.
        localStoragekeys.push(Number.parseInt(localStorage.key(i)))
        localStoragekeys.sort()
        
    }


    for (let i = 0; i < localStorage.length; i++) {
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


let removeTodo = () => {
 //Created the delete function for todo.
    for (let i = 0; i < deleteTodo.length; i++) { //Printing all todo items from dom.
        deleteTodo[i].addEventListener('click', (e) => {  //click event in delete icon.
            e.target.parentNode.parentNode.remove() //Deleting specific todo item which will select by the user.
            localStorage.removeItem(`${localStoragekeys[i]}`)
        })
    }
}




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


let editTodoButton = document.getElementsByClassName('editTodo')
let editTodo = () => {
    
    for (let i = 0; i < localStorage.length; i++) {
        let editInput = document.createElement('input')
        let element;
        let editableContent;
        editTodoButton[i].addEventListener('click', () => {
            if (editTodoButton[i].classList.contains('fa-pen')) {
                editTodoButton[i].index = localStoragekeys[i]
                console.log(localStoragekeys)
              element = editTodoButton[i]
                element.classList.remove('fa-solid', 'fa-pen')
                element.classList.add('fa-solid', 'fa-check','text-green-700')  
                editInput.type = "text"
                editInput.classList.add('bg-green-200','p-2')
                editInput.style.width = "80vw"
              editableContent  = element.parentNode.parentNode.firstElementChild.lastElementChild
                editInput.value = editableContent.innerText
                editableContent.innerHTML = "";
                editableContent.append(editInput)
            }
            else {
                localStorage.setItem(`${editTodoButton[i].index}`,editInput.value)
                editableContent.innerText = editInput.value;
                element.classList.remove('fa-solid', 'fa-check','text-green-700')
                element.classList.add('fa-solid', 'fa-pen')

            }
         

        })


// toDo()

    }





}
toDo()
removeTodo()

editTodo()








