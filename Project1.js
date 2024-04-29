
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
let weekArr = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thrusday', 'Friday', 'Saturday' ]
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
        day.innerText =weekArr[dateTime.getDay()];
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

let analogPage = document.getElementById('AnalogClock')
let pageSwitches = document.getElementsByClassName('navButtons')
let pageSwitches2 = document.getElementsByClassName('pageSwitches')
let pages = document.getElementsByClassName('pages')


// Page Switches

// Iterate over each element in the pageSwitches NodeList and attach a click event listener to it
Array.from(pageSwitches).forEach((element) => {

    element.addEventListener('click', (e) => {
        // Call pageSwitchFunc passing the clicked element
        pageSwitchFunc(element)
        console.log(element)
       

      
     
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
            element.classList.add('hidden')
            e.classList.remove('text-white')
          console.log(element)
        } else {
            // If the ID matches, display the element
            elementArr[index].classList.remove('hidden') // Note: "block" corrected from "Block" to match CSS
            console.log(e)
            
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
let tempreature = document.getElementsByClassName('tempreature')
let locationName = document.getElementById('locationName')
let searchLocationBtn = document.getElementById('searchLocationBtn')
let searchError = document.getElementById('searchError')
let apiErrorMessage = document.getElementById('apiErrorMessage')

let previousPageBtn = document.getElementById('previousPage')


searchLocationBtn.addEventListener('click', () => {

    editApi(locationName.value)

})

let editApi = (value) => {
    const url = `https://weather-api138.p.rapidapi.com/weather?city_name=${value}`;

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '01ca6a8199msh68335ea786a5b1ep13000bjsn946b43a1c2d4',
            'X-RapidAPI-Host': 'weather-api138.p.rapidapi.com'
        }
    };
    weatherApi(url, options)
}


let askLocationPage = document.getElementById('askLocation')
let weatherMainPage = document.getElementById('weatherMainPage')


let weatherApi = async (url, options) => {
    try {
        const response = await fetch(url, options);
        const result = await response.json();

        if (locationName.value == '') {
            console.log(locationName.value)
            searchError.classList.remove('hidden')
            searchError.innerText = `Enter City Name.`
        } else if (result.cod == 404) {
            searchError.classList.remove('hidden')
            searchError.innerText = `${result.message}`
        }
        else {
            apiData(result)
            askLocationPage.classList.add('hidden')
            weatherMainPage.classList.remove('hidden')
            previousPageBtn.classList.remove('hidden')
            previousPageBtn.addEventListener('click',()=>{
                weatherMainPage.classList.add('hidden')
                askLocationPage.classList.remove('hidden')
                previousPageBtn.classList.add('hidden')
            })
          
            
        }



    } catch (error) {
        console.log(error)

    }

}
let Precipitation = document.getElementById('Precipitation')
let Humidity = document.getElementById('Humidity')
let Wind = document.getElementById('Wind')
let apiDay = document.getElementsByClassName('apiDay')
let apiDateTime = document.getElementById('apiDate')
let pressure = document.getElementById('pressure')
let windDeg = document.getElementById('windDeg')
let tempMax = document.getElementById('tempMax')
let tempMin = document.getElementById('tempMin')
let weatherType1 = document.getElementById('weatherType1')
let weatherType2 = document.getElementById('weatherType2')
let weatherTypeIcon = document.getElementById('weatherTypeIcon')




let apiData = (data, error) => {
    ({ coord, weather, main, wind, clouds, timezone, sys, name, } = data)

    let temp = main.temp_max - 273.15
    let tempMinData = main.temp_min -273.15
    areaLocation.innerText = `${name},${sys.country}`

    Array.from(tempreature).forEach((element) => {
        element.innerHTML = `<h1>${temp.toFixed(0)}&deg;  C</h1>`;
    })

    const iconUrl = ` https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
    weatherTypeIcon.innerHTML = ` <img src="${iconUrl}" class="block" alt="404">`
    pressure.innerText = `${main.pressure} hPa`
    Humidity.innerText = `${main.humidity}%`;
    let windSpeed = (wind.speed)*3.6;
    Wind.innerText= `${windSpeed.toFixed(0)} km/h`;
    windDeg.innerHTML = `<h1>${wind.deg} &deg;</h1>`
    tempMax.innerHTML =  `<h1>${temp.toFixed(0)}&deg;  C</h1>`;
    tempMin.innerHTML =  `<h1>${tempMinData.toFixed(0)}&deg;  C</h1>`;
    weatherType1.innerText=`${weather[0].main}`
    weatherType2.innerText=`${weather[0].main}`


}









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
        savedTask.innerHTML += `  <h1  class="savedItem border my-2 bg-slate-200 w-full p-5 rounded-md flex sm:flex-row md:flex-row lg:flex-row flex-wrap  justify-between"> <div class="flex items-center "> <i class="fa-regular fa-circle mx-2 " ></i><p>${this.data}</p></div><div class=" sm:w-24 md:w-24 lg:w-24 w-full flex lg:justify-between md:justify-between sm:justify-between justify-end items-center sm:mt-0 md:mt-0 lg:mt-0 mt-10 border "><i id="editTodo" class="lg:mr-0 md:mr0 sm:mr-0 mr-4 editTodo cursor-pointer fa-solid fa-pen hover:text-blue-700"></i><i value="1" class="lg:mr-0 md:mr0 sm:mr-0 mr-4 deleteTodo cursor-pointer fa-solid fa-trash hover:text-red-600"></i><i class="fa-regular fa-star"></i></div></h1>`;
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
                element.classList.add('fa-solid', 'fa-check', 'text-green-700')
                editInput.type = "text"
                editInput.classList.add('bg-green-200', 'p-2')
               editInput.classList.add('w-[60vw]')
               editInput.classList.add('flex-wrap')
                editableContent = element.parentNode.parentNode.firstElementChild.lastElementChild
                editInput.value = editableContent.innerText
                editableContent.innerHTML = "";
                editableContent.append(editInput)
            }
            else {
                localStorage.setItem(`${editTodoButton[i].index}`, editInput.value)
                editableContent.innerText = editInput.value;
                element.classList.remove('fa-solid', 'fa-check', 'text-green-700')
                element.classList.add('fa-solid', 'fa-pen')

            }


        })


        // toDo()

    }





}
toDo()
removeTodo()

editTodo()








