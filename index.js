import { menuArray } from "./data.js"
let orderArray = []
const nameInput = document.getElementById("name-input")
let name = ""

document.addEventListener("click",function(e){
    if(e.target.dataset.add){
        addItem(e.target.dataset.add)
        renderOrder()
    } else if(e.target.dataset.remove){
        removeItem(e.target.dataset.remove)
        renderOrder()
    } else if(e.target.id === "order-btn"){
        document.getElementById("modal-container").classList.toggle("hidden")
    } else if(e.target.id === "modal-container"){
        document.getElementById("modal-container").classList.toggle("hidden")
    } else if(e.target.id === "pay-btn"){
        name = nameInput.value
    } 
})

function renderOrder(){
    if (orderArray[0]){
        document.getElementById("order").innerHTML = getOrder() 
    } else {
        document.getElementById("order").innerHTML = ""         
    }
    
}

document.addEventListener("submit",function(e){
    e.preventDefault()
    renderThanks(name)
})

function renderThanks(name){
    document.getElementById("modal-container").classList.toggle("hidden")
    document.getElementById("order").innerHTML = ` <div id="thanks-div">
                                                        <h1>Thanks, ${name}! Your order is on its way!</h1>
                                                   </div>  `
}

function renderProducts(){
    document.getElementById("menu").innerHTML = getMenu()
}

function getMenu(){
    let menu = ""
    menuArray.forEach(function(product){
      menu +=  `<div class="product">
                    <div class="product-emoji">${product.emoji}</div>
                    <div class="product-details">
                        <h1 class="product-name">${product.name}</h1>
                        <p class="product-ingredients">${product.ingredients}</p>
                        <p class="product-price">${product.price}</p>
                    </div>
                    <btn class="product-btn" data-add="${product.id}">+</btn>
                </div>`  
    })
    return menu
}

function addItem(itemId){
    let clickedItem = menuArray.filter(function(item){
        return item.id == itemId
    })
    orderArray.push(clickedItem[0])
    getOrder()
}

function removeItem(itemIndex){
    orderArray.splice(itemIndex,1)
    getOrder()
}

function getOrder(){
    let orderList = ""
    orderArray.forEach(function(item){
        orderList +=   `<div class="order-item">
                            <h2>${item.name}</h2>
                            <p class="item-remove" data-remove="${orderArray.indexOf(item)}">remove</p>
                            <p class="item-price">${item.price}<p>
                        </div>`
    })
    let order =    `<h2>Your Order</h2>
                    <div id="order-list">
                        ${orderList}
                    </div>
                    <div id="total-price">
                        <h2>Total price:</h2>
                        <p>${getTotalPrice()}</p>
                    </div>
                    <btn id="order-btn" class="green-btn order-btn">Complete order</btn>`  
    return order
}

function getTotalPrice(){
    let sum = 0
    orderArray.forEach(function(item){
        sum += item.price
    })
    return sum
}

renderProducts()

    