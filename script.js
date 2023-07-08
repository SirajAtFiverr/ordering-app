import {menuArray} from "/data.js"

const itemsEl = document.querySelector(".items");

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