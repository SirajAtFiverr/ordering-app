import {menuArray, cart} from "/data.js"

const itemsEl = document.querySelector(".items");
const cartEl = document.querySelector(".cart");
const cartItemsEl = document.querySelector(".cart-items");
const cartTotalEl = document.querySelector(".total-price");
const paymentBoxEl = document.querySelector(".payment-box");
const  messageEl = document.querySelector(".message-box");

function renderItems(){
    menuArray.forEach(renderItem);
}

function renderItem(item){

    const itemHTML = `<div class="item">
                    <section class="item-photo">
                        ${item.emoji}
                    </section>
                    <section class="item-desc">
                        <h2>${item.name}</h2>
                        <p class="item-ingredients">${item.ingredients.join(' ,')}</p>
                        <P class="item-price">$${item.price}</P>
                    </section>
                    <section class="add-to-cart-option">
                        <button class="add-to-cart-button" id=${item.id}>+</button>
                    </section>
                </div>`
    itemsEl.innerHTML += itemHTML;
}

renderItems();

function addToCart(item){
    cart.push({
        name: item.name,
        price: item.price,
        id: item.id
    });
}

function calculateTotal(){
    let total = 0;
    cart.forEach(function(item){
        total += item.price;
    })
    return total;
}

function renderCart(){
    if(cart.length === 0){
        cartEl.classList.add("hidden");
    }
    else{
        cartEl.classList.remove("hidden");
    }


    cartItemsEl.innerHTML = "";
    cart.forEach(renderCartItem);
    cartTotalEl.textContent = `$${calculateTotal()}`;
}

function renderCartItem(cartItem){
    const cartItemHTML = `<div class="cart-item">
                            <h3>${cartItem.name}</h3>
                            <button class="remove-button" id=${cartItem.id}>remove</button>
                            <p class="cart-item-price">$${cartItem.price}</p>
                        </div>`
    cartItemsEl.innerHTML += cartItemHTML;
}


function displayPaymentBox(){
    paymentBoxEl.classList.remove("hidden");
}



document.addEventListener("click", function(event){
    if(event.target.classList.contains("add-to-cart-button")){
        const itemID = event.target.id;
        const item = menuArray.find(function
            (item){
                return item.id === Number(itemID);
            }
        );
        addToCart(item);
        renderCart();
    }

    if(event.target.classList.contains("remove-button")){
        const itemID = event.target.id;
        const itemIndex = cart.findIndex(function(item){
            return item.id === Number(itemID);
        });
        cart.splice(itemIndex, 1);
        renderCart();
    }

    if(event.target.classList.contains("order-button")){
        cart.length = 0;
        renderCart();
        paymentBoxEl.classList.remove("hidden");
    }

});

document.addEventListener("keydown", function(event){
    if (event.keyCode === 38 || event.keyCode === 40) {
        event.preventDefault();
      }
});

document.addEventListener("submit", function(event){
    event.preventDefault();
    const formData = new FormData(event.target);
    messageEl.textContent = `Thanks ${formData.get("name")}! your order has been placed!`;
    messageEl.classList.remove("hidden");
    paymentBoxEl.classList.add("hidden");
    
    setTimeout(function(){
        messageEl.classList.add("hidden");
    }, 2000);
    
});