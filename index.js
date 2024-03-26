import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL : "https://addtothecart-45f7b-default-rtdb.asia-southeast1.firebasedatabase.app/"
}
const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

onValue(shoppingListInDB, function(snapshot) {
    cleardisplayShoppingList()
    if(snapshot.exists()){
        let itemsArray = Object.entries(snapshot.val())
        for(let i=0; i<itemsArray.length; i++) {
        appendItemToShoppingListEl(itemsArray[i])
        }  
    } else {
        shoppingListEl.textContent = "No items here yet"
    }
    
})

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    if(inputValue) {
        push(shoppingListInDB, inputValue)
        clearInputFieldEl()
    }
})

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function appendItemToShoppingListEl(item) {
    let itemId = item[0]
    let itemValue = item[1]
    const newEl = document.createElement("li")
    newEl.classList.add("item")
    newEl.textContent = itemValue
    newEl.addEventListener("dblclick", function() {
        let exactLocationOfStoryInDB = ref(database, `shoppingList/${itemId}`)
        remove(exactLocationOfStoryInDB)
    })
    shoppingListEl.append(newEl)
}

function cleardisplayShoppingList() {
    shoppingListEl.innerHTML = ""
}