var menuFoodDisplay = document.getElementsByClassName('food-container')[0];
var menu_Drinks_Display = document.getElementsByClassName('drink-container')[0];
var cartCount = document.getElementById('cart-count');
var display_cart = document.getElementById('cart-list');
var total_display = document.getElementsByClassName('total')[0];
var cart_display_container = document.getElementsByClassName('cart-container');
var cart_icon = document.getElementsByName('cart')[0];
var isOpen = false; //toggle the cart display
var customerNameInput = document.getElementById('customer');
var noNameError = document.getElementById('noNameError');
var checkoutButton = document.getElementsByName('checkout');
var addCustomerButton = document.getElementById('addCustomer');
var customer_name_display = document.getElementById('customer-name');
var shop_user_name_input = document.getElementsByClassName('shop-user-name-input');
var no_items = document.getElementsByClassName('No-items')[0];

var checkout_cart;


checkoutButton[0].addEventListener('click', (event) => {
    checkout(event, cart, customerNameInput);
});

addCustomerButton.addEventListener('click', function (event) {
    ;
    if (customerNameInput.value == "") {
        noNameError.innerText = `please, enter your name to checkout!`;

    } else {
        /* hidden the container, disable buttons and hidden inputs  */
        shop_user_name_input[0].style.visibility = "hidden";
        event.target.disabled = true;
        event.target.hidden = true;
        event.target.previousElementSibling.hidden = true;
        customer_name_display.innerText = `Customer name: ${customerNameInput.value}`;
    }
});

cart_icon.addEventListener('click', function () {
    if (isOpen == false) {
        isOpen = true;
        cart_display_container[0].style.visibility = "visible";

    } else {
        isOpen = false;
        cart_display_container[0].style.visibility = "hidden";
    }
});


var originalInventory = [{
        id: "ihafshdhifh",
        name: "Big Mac",
        img: "./assets/big_mac_meal.PNG",
        price: 14.99,
        count: 5
    },
    {
        id: "hfidsadifisi",
        name: "Double Quarter",
        img: "./assets/double_quarter_pounder_meal.PNG",
        price: 13.79,
        count: 5
    },
    {
        id: "sdoifiwejie",
        name: "Quarter Pounder",
        img: "./assets/quarter_pounderr_meal.PNG",
        price: 11.59,
        count: 6
    },
    {
        id: "kjugtsyvjbo",
        name: "chicken Nuggets",
        img: "./assets/chicken_nuggets_meal.PNG",
        price: 12.59,
        count: 10
    },
    {
        id: "kksexcvhic",
        name: "French Fries",
        img: "./assets/chicken_nuggets_meal.PNG",
        price: 3.49,
        count: 15
    },
    {
        id: "pwjeoqwiqiowo",
        name: "Two Cheese Burgers",
        img: "./assets/two_cheeseburger_meals.PNG",
        price: 10.49,
        count: 20
    }, {
        id: "ojdasifhwiohfe",
        name: "Spicy McChicken",
        img: './assets/Spicy_mcChicken.PNG',
        price: 10.43,
        count: 8
    }, {
        id: 'iehiowhqzknzif',
        name: 'Deluxe Spicy McChicken',
        img: './assets/Delux_chrispy_mcChicken.PNG',
        price: 11.59,
        count: 11
    }
];

var inventory = [{
        id: "ihafshdhifh",
        name: "Big Mac",
        img: "./assets/big_mac_meal.PNG",
        price: 14.99,
        count: 7
    },
    {
        id: "hfidsadifisi",
        name: "Double Quarter",
        img: "./assets/double_quarter_pounder_meal.PNG",
        price: 13.79,
        count: 13
    },
    {
        id: "sdoifiwejie",
        name: "Quarter Pounder",
        img: "./assets/quarter_pounderr_meal.PNG",
        price: 11.59,
        count: 6
    },
    {
        id: "kjugtsyvjbo",
        name: "chicken Nuggets",
        img: "./assets/chicken_nuggets_meal.PNG",
        price: 12.59,
        count: 10
    },
    {
        id: "kksexcvhic",
        name: "French Fries",
        img: "./assets/chicken_nuggets_meal.PNG",
        price: 3.49,
        count: 15
    },
    {
        id: "pwjeoqwiqiowo",
        name: "Two Cheese Burgers",
        img: "./assets/two_cheeseburger_meals.PNG",
        price: 10.49,
        count: 20
    }, {
        id: "ojdasifhwiohfe",
        name: "Spicy McChicken",
        img: './assets/Spicy_mcChicken.PNG',
        price: 10.43,
        count: 8
    }, {
        id: 'iehiowhqzknzif',
        name: 'Deluxe Spicy McChicken',
        img: './assets/Delux_chrispy_mcChicken.PNG',
        price: 11.59,
        count: 11
    }
];
var drinksInventory = [{
    id: "njanslna",
    name: "Coke",
    img: "./assets/coke.PNG",
    price: 1.79,
    count: 20
}, {
    id: "adaijdwa",
    name: "Dr.pepper",
    img: "./assets/dr_pepper.PNG",
    price: 1.79,
    count: 20
}, {
    id: "iqjwioedeq",
    name: "Fanta Orange",
    img: "./assets/Fanta_Orange.PNG",
    price: 1.79,
    count: 20
}, {
    id: "ojwoidapopw",
    name: "Root Beer",
    img: "./assets/root_beer.PNG",
    price: 1.79,
    count: 20
}, {
    id: "awoejfopa",
    name: "Sprite",
    img: "./assets/sprite.PNG",
    price: 1.79,
    count: 20
}, {
    id: "peoqkmqwkdmqo",
    name: "StrawberryBanana Smoothies",
    img: "./assets/strawberry_banana_smoothie.PNG",
    price: 4.19,
    count: 20
}];

var over_the_max_limit;
var item_not_store;
var please_enter_item;
var cart = [];
var allAddButtons = document.getElementsByName("add");

/* listening to the DOM to get parsed to so that I can add a event to the buttons */
document.addEventListener('DOMContentLoaded', updateDisplay);


function updateDisplay() {

    generateFoodDisplay();
    generateDrinksDisplay();
    generateCart();
    allAddButtons.forEach((addButton, index) => {
        addButton.addEventListener('click', (event) => {
          
            addItem(event, index);
        });
    });
    over_the_max_limit = document.getElementsByClassName('item-error');
    item_not_store = document.getElementsByClassName('item-error');
    please_enter_item = document.getElementsByClassName('item-error');
    


    document.querySelectorAll('[name="remove"]').forEach((removeButton, index) => {
        removeButton.addEventListener('click', (event) => {
            removeItem(event, index)
        });
    });

    document.querySelectorAll('[name="removeAll"]').forEach((removeButton, index) => {
        removeButton.addEventListener('click', (event) => {
            removeAllItems(event, index)
        });
    });

}

function generateFoodDisplay() {
   
    menuFoodDisplay.innerHTML = "";
    no_items.innerHTML = "";
    inventory.forEach((item) => {
        /*  created a tenary operator inside of item_empty_element*/
        let item_empty_element = item.count > 0 ? " " : `<div class='item-empty'>
       <p>${item.name} Meal is out of stock</p>
    </div>`;
        let remove_all_button = item.count > 0 ? " " : `<button type="click" name="removeAll" value="${item.name}">Remove All ${item.name}</button>`;
        let element_add_button = item.count > 0 ? `<input type="number" placeholder="please enter a number" name="${item.name}" min="1" max="${item.count}" step="1" oninput="this.value = Math.abs(this.value)" >
            <button  name="add" value="${item.name}">Add ${item.name}</button>` : `<input type="number" placeholder="please enter a number" name="${item.name}" min="1" max="${item.count}" step="1" hidden>
            <button type="click" name="add" value="${item.name}" disabled>Add ${item.name}</button>`
        /* create a tenary operator to for the add button to disable it once the item.count hits zero
            add hidden to the input, disabled to the button */
        /* generate the display */
        return menuFoodDisplay.innerHTML = menuFoodDisplay.innerHTML +
            `<div class="item1">
    <div class="item-icon">
        <img src=${item.img} alt=" ${item.name} meal">
    </div>
    <div class="item-information">
        <p><strong>${item.name}</strong></p>
        <p><strong>Quantity</strong>:<strong class="item-count-food">${item.count}</strong></p>
        <p> <strong>Price</strong>:<strong> $${item.price}</strong></p>
        <div class="item-input">
            ${element_add_button}
             <input type="number" placeholder="please enter a number" name="${item.name}" min="1" max="${item.count}" step="1" oninput="this.value = Math.abs(this.value)">
            <button type="click" name="remove"  value="${item.name}">remove ${item.name}</button>
            ${remove_all_button}
            </div>
    </div>
     <div class="item-error"></div>
    ${item_empty_element}
   </div>`
    });

  
}










function generateDrinksDisplay() {
    menu_Drinks_Display.innerHTML = "";
    no_items.innerHTML = "";
    drinksInventory.forEach((item) => {
        /*  created a tenary operator inside of item_empty_element*/
        let item_empty_element = item.count > 0 ? " " : `<div class='item-empty'>
       <p>${item.name} Meal is out of stock</p>
    </div>`;
        let remove_all_button = item.count > 0 ? " " : `<button type="click" name="removeAll" value="${item.name}">Remove All ${item.name}</button>`;
        let element_add_button = item.count > 0 ? `<input type="number" placeholder="please enter a number" name="${item.name}" min="1" max="${item.count}" step="1" oninput="this.value = Math.abs(this.value)" >
            <button type="click" name="add" value="${item.name}">Add ${item.name}</button>` : `<input type="number" placeholder="please enter a number"  name="${item.name}" min="1" max="${item.count}" step="1" hidden>
            <button type="click" name="add" value="${item.name}" disabled>Add ${item.name}</button>`


        /* create a tenary operator to for the add button to disable it once the item.count hits zero
            add hidden to the input, disabled to the button */
        /* generate the display */
        return menu_Drinks_Display.innerHTML = menu_Drinks_Display.innerHTML +
            `<div class="item1">
        <div class="item-icon">
            <img src=${item.img} alt=" ${item.name} meal">
        </div>
        <div class="item-information">
            <p><strong>${item.name}</strong></p>
            <p><strong>Quantity</strong>:<strong class="item-count"> ${item.count > 0 ? item.count :  0}</strong></p>
            <p> <strong>Price</strong>:<strong> $${item.price}</strong></p>
            <div class="item-input">
                ${element_add_button}
                 <input type="number" name="${item.name}" placeholder="please enter a number" min="1" max="${item.count}" step="1" oninput="this.value = Math.abs(this.value)">
                <button type="click" name="remove"  value="${item.name}">Remove ${item.name}</button>
            ${remove_all_button}
                </div>
        </div>
         <div class="item-error"></div>
        ${item_empty_element}
       </div>`





    });
}





/*regarding the additem functionality, there are many ways i could go about this function 
*what i will do is add the item to the cart and update the inventory since someone is removing an item from the inventory 
target.previousElementSibling.value => value of the input 
target.previousElementSibling.max => max based on the quantity available 
target.previousElementSibling.min => starting at 1 
target.value => value of the button
*/
function addItem(event, index) {
    let itemName = event.target.value;
    /* the reason for this is because that nodelist keeps increasing with you add an item to the inventory and decreases when you remove an item
    i decide to offset the index by 1 to have the error indicators be matched up with the appropriate items */
    if (index == 0) {
        over_the_max_limit[index].innerHTML = "";
        please_enter_item[index].innerHTML = "";
    } else {
        over_the_max_limit[index - 1].innerHTML = "";
        please_enter_item[index - 1].innerHTML = "";
    }

    /* essentially want I am doing it looking to see if the item is in stock or not
        I know that the tenary operator will update the display and prevent the customer from buying but still i want to 
        look. This line of code will be useful in the future for the remove button */
    let foundInFoodInventory = inventory.find((product) => {
        if ((product.name == itemName) && (product.count != 0)) {
            return true;
        }
    });
    let foundInShopCart = cart.find((item) => {
        if (item.name == itemName) {
            return true;
        }
    });

    let foundInDrinksInventory = drinksInventory.find((product) => {
        if ((product.name == itemName) && (product.count != 0)) {
            return true;
        }
    });


    //grab the cart array
    //place values into the cart push()
    //at the same time update the inventory and generate the display again
    //using the array find() instead of the foreach() 
    let minCount = event.target.previousElementSibling == null ? 1 : Number(event.target.previousElementSibling.min);

    let inventoryCount = event.target.previousElementSibling == null ? foundInFoodInventory != undefined ? foundInFoodInventory.count : foundInDrinksInventory : Number(event.target.previousElementSibling.max);
    let wantCount = event.target.previousElementSibling == null ? 1 : Number(event.target.previousElementSibling.value);




    if (wantCount > inventoryCount) {
        over_the_max_limit[index - 1].innerHTML = `<p style="color: red;">Over the max limit, please adjust the quantity</p>`;
    } else if (wantCount < minCount) {
        please_enter_item[index - 1].innerHTML = `<p style="color: red;">please enter an amount</p>`
    } else {
        switch (foundInShopCart) {
            /* if it is not already in the cart */
            case undefined:
                switch (foundInFoodInventory) {
                    case undefined:
                        /* if i have multiple people accessing the same inventory the code will be placed here
                                             // if these iventories food and drink have stock or not */
                        switch (foundInDrinksInventory) {
                            case undefined:
                                break;
                            case foundInDrinksInventory:
                                for (let i = 0; i < drinksInventory.length; i++) {
                                    if (drinksInventory[i].name == itemName) {
                                        cart.push({
                                            name: drinksInventory[i].name,
                                            id: drinksInventory[i].id,
                                            count: wantCount,
                                            price: drinksInventory[i].price,
                                            img: drinksInventory[i].img
                                        });
                                        /* creating a for loop to loop through the inventory, use push() instead because i want every thing except the image */
                                        foundInDrinksInventory.count = foundInDrinksInventory.count - wantCount;
                                        cartCount.innerText = Number(cartCount.innerText) + wantCount;
                                        updateDisplay();
                                        break;
                                    }
                                }
                                break;
                        }
                        break;
                        //end of undefined foundIninventory break                   
                    case foundInFoodInventory:
                        /* creating a for loop to loop through the inventory, use push() instead because i want every thing except the image */
                        for (let i = 0; i < inventory.length; i++) {
                            if (inventory[i].name == itemName) {
                                cart.push({
                                    name: inventory[i].name,
                                    id: inventory[i].id,
                                    count: wantCount,
                                    price: inventory[i].price,
                                    img: inventory[i].img
                                });

                                /* since we already have the name of the product already saved we can just edit the count  */
                                foundInFoodInventory.count = foundInFoodInventory.count - wantCount;
                                /* putting the wantCount inside the cartCount to show how many items is in the cart
                                is the cartCount based on the count in side the shopping cart or based on the item it self 
                                the innerText is a string so we need to turn that into Number*/
                                cartCount.innerText = Number(cartCount.innerText) + wantCount;
                                updateDisplay();
                                break;
                            }
                        }
                        break;
                        //end of foundInventory break
                }
                break;
                //end of undefined for foundInShop cart break
            case foundInShopCart:
                switch (foundInFoodInventory) {
                    case undefined:
                        /* tenary operator will take care of this problem  b/c disabling and hiding the input
                        also our wantCount > inventorycount*/
                        switch (foundInDrinksInventory) {
                            case undefined:
                                /* tenary operator will take care of this problem  b/c disabling and hiding the input
                        also our wantCount > inventorycount*/
                                break;
                            case foundInDrinksInventory:
                                /* The item is found in the shopping cart and there is inventory available, 
                                                       add to the shopping and substract the drinks  inventory  */
                                foundInShopCart.count = foundInShopCart.count + wantCount;
                                foundInDrinksInventory.count = foundInDrinksInventory.count - wantCount;
                                cartCount.innerText = Number(cartCount.innerText) + wantCount;
                                updateDisplay();
                                break;
                        }
                        break;
                    case foundInFoodInventory:
                        /* The item is found in the shopping cart and there is inventory available, 
                        add to the shopping and substract the inventory  */
                        foundInShopCart.count = foundInShopCart.count + wantCount;
                        foundInFoodInventory.count = foundInFoodInventory.count - wantCount;
                        cartCount.innerText = Number(cartCount.innerText) + wantCount;
                        updateDisplay();
                        break;
                }
                break;
        }
    }





} // END OF ADDITEM ();

function removeItem(event, index) {
    if(index == 0){
        please_enter_item[index].innerHTML = ""; 
        item_not_store[index].innerHTML = "";
    }else{
        please_enter_item[index-1].innerHTML = ""; 
        item_not_store[index-1].innerHTML = "";
    }
    /* copy the variables from the addItem ()
    find item in the cart, remove item from the cart depending the amount,
    add the amount back to the inventory
    HUGE QUESTION: what if the customer is trying to remove an item that is not inside the cart?
    display to the user that the item is not in your cart and you must add the item first to for the item to be 
    removed */
    let minCount = Number(event.target.previousElementSibling.min);
    let foodInventoryCount = Number(event.target.previousElementSibling.max);

    let drinkInventoryCount = Number(event.target.previousElementSibling.max);
    let removeCount = event.target.previousElementSibling.value == undefined ? 1 : Number(event.target.previousElementSibling.value);

    let itemName = event.target.value;
    let tempCountHold;
    let foundInShopCart = cart.find((item) => {
        if (item.name == itemName) {
            return true;
        }
    });

    let foundInFoodInventory = inventory.find((product) => {
        if ((product.name == itemName && product.count == 0) || (product.name == itemName && product.count != 0)) {
            return true;
        }
    });
    let foundInDrinksInventory = drinksInventory.find((product) => {
        /* give me the name of the product, if the count is the all of the product was taken or if the product 
        still have inventory  */
        if ((product.name == itemName && product.count == 0) || (product.name == itemName && product.count != 0)) {
            return true;
        }
    });
    if (removeCount < minCount) {
        please_enter_item[index].innerHTML = `<p style="color: red;">please enter an amount</p>`
    } else {
        switch (foundInShopCart) {
            case undefined:
                /* display a message to the customer telling them that the item is not in the cart  and resetting the input value*/
                // target.previousElementSibling.placeholder
                item_not_store[index].innerHTML = `<p style="color: red;">This item is not inside your cart, please add the item to then remove it </p>`;
                event.target.previousElementSibling.value = 0;
                break;
                //end of foundInShopCart
            case foundInShopCart:
                switch (foundInFoodInventory) {
                    case undefined:
                        /* if it is not in the food inventory then it must be inside the drinks inventory  */
                        switch (foundInDrinksInventory) {
                            case undefined:
                                /* if it is not in the drink inventory then the item was never in the food/drinks inventory
                                and probably was never in the shopping cart to begin with */
                                break;
                            case foundInDrinksInventory:
                                // tempCountHold will hold the value of how many items of that certain product has
                                tempCountHold = foundInShopCart.count;
                                /* created a tenary operator to set the item in the cart to 0 if the item in the cart - how many should be removed 
                                is less 0 */
                                foundInShopCart.count = (foundInShopCart.count - removeCount <= 0) ? foundInShopCart.count = 0 : foundInShopCart.count - removeCount;
                                /* change from a switch statement to a if - else statement because of the complex logic */

                                switch (foundInShopCart.count) {
                                    case 0:



                                        /* since we add a "-" button inside the cart, it has no want of knowing found inventory count is which will result in a number + undefined
                                                                     to fixed that will use a tenary operator. check to see if it is NaN with isNaN
                                                                     if true sent the variable of food inventory to the found in food inventory count since they are the same thing
                                                                     */
                                        drinkInventoryCount = isNaN(drinkInventoryCount) === true ? foundInDrinksInventory.count : drinkInventoryCount;

                                        /* tempCounthold (how many items of the product is in the cart) +
                                                           productCount (how many item is inventory)  will give us our original starting iventory for that product*/
                                        foundInDrinksInventory.count = tempCountHold + drinkInventoryCount;

                                        /* if the cart is display 5 in total => we are going to do is get the total from the cart as a
                                        Number which is 5, second part is getting the amount which is equal to 5 as well. we can get that from the 
                                        tempCountHold and the inventory count 
                                        for example tempcounthold => 5 - inventory count => 0 */
                                        /*0 display next to the cart */
                                        cartCount.innerText = (Number(cartCount.innerText) + drinkInventoryCount) - (tempCountHold + drinkInventoryCount)
                                        /* finding the element inside the array and pop it out of the array by the index  */
                                        cart = cart.filter((product) => {
                                            if (product.name != itemName) {

                                                return product;
                                            }
                                        });
                                        updateDisplay();
                                        break;
                                        //end of the found in shop cart count
                                    default:
                                        //add items back to the certain product 
                                        foundInDrinksInventory.count = foundInDrinksInventory.count + removeCount;
                                        cartCount.innerText = Number(cartCount.innerText) - removeCount;
                                        updateDisplay();
                                }
                                break;
                                //end of foundInDrinksInventory break
                        }
                        break;
                        //end of foundInFoodInventory break
                    case foundInFoodInventory:

                        // tempCountHold will hold the value of how many items of that certain product has inside the shopping cart
                        tempCountHold = foundInShopCart.count;
                        /* created a tenary operator to set the item in the cart to 0 if the item in the cart - how many should be removed 
                        is less 0 */
                        foundInShopCart.count = (foundInShopCart.count - removeCount <= 0) ? foundInShopCart.count = 0 : foundInShopCart.count - removeCount;
                        /* change from a switch statement to a if - else statement because of the complex logic */

                        switch (foundInShopCart.count) {
                            case 0:
                                /* since we add a "+" button inside the cart, it has no want of knowing found inventory count is which will result in a number + undefined
                                to fixed that will use a tenary operator. check to see if it is NaN with isNaN
                                if true sent the variable of food inventory to the found in food inventory count since they are the same thing
                                */
                                foodInventoryCount = isNaN(foodInventoryCount) === true ? foundInFoodInventory.count : foodInventoryCount;

                                /* tempCounthold (how many items of the product is in the cart) +
                                                   productCount (how many item is inventory)  will give us our original starting iventory for that product*/
                                foundInFoodInventory.count = tempCountHold + foodInventoryCount;
                                /* if the cart is display 5 in total => we are going to do is get the total from the cart as a
                                       Number which is 5, second part is getting the amount which is equal to 5 as well. we can get that from the 
                                       tempCountHold and the inventory count 
                                       for example tempcounthold => 5 - inventory count => 0 */
                                cartCount.innerText = (Number(cartCount.innerText) + foodInventoryCount) - (tempCountHold + foodInventoryCount);
                                /* finding the element in the array and flitering everything except that the item that is being removed back into the cart
                                if the Big Mac are being removed, then we should see everything except the big macs */
                                cart = cart.filter((product) => {
                                    if (product.name != itemName) {

                                        return product;
                                    }
                                });
                                updateDisplay();
                                break;
                                //end of the found in shop cart count
                            default:

                                //add items back to the certain product 
                                foundInFoodInventory.count = foundInFoodInventory.count + removeCount;
                                cartCount.innerText = Number(cartCount.innerText) - removeCount;
                                updateDisplay();
                        }
                        break;
                        //end of the founInInventory break 
                }
                break;
                //end of foundInShopCart break 
        } //end of switch statement
    } //end of else statement
} //END for RemoveItem function

/* remove all of a certain item from the shopping back into the inventory 
this is a button and it will not need input form
Grab the name from the button and them remove the whole item from the shopping cart, but i need to make sure the product 
get back it's stock*/
function removeAllItems(event, index) {
    let itemName = event.target.value;
    let foundInShopCart = cart.find((item) => {
        if (item.name == itemName) {
            return true;
        }
    });

    let foundInFoodInventory = inventory.find((product) => {
        if ((product.name == itemName && product.count == 0) || (product.name == itemName && product.count != 0)) {
            return true;
        }
    });
    let foundInDrinksInventory = drinksInventory.find((product) => {
        /* give me the name of the product, if the count is the all of the product was taken or if the product 
        still have inventory  */
        if ((product.name == itemName && product.count == 0) || (product.name == itemName && product.count != 0)) {
            return true;
        }
    });
    /*i wont have to look if the item is in the cart because of the conditional that i put on the button
    once the user add an item to the cart the button will display letting the customer know that */
    switch (foundInFoodInventory) {
        case undefined:
            switch (foundInDrinksInventory) {
                case undefined:
                    break;
                case foundInDrinksInventory:
                    /* combinding both shop inventory and food drink inventory to provide the original amount that was stored with that product */
                    /* this is not needed because it will always be zero => found in drink inv because all of the inventory must be in the shopping cart for you 
                    for you to be allowed to removed all item back into the inventory */
                    foundInDrinksInventory.count = foundInShopCart.count + foundInDrinksInventory.count;
                    cartCount.innerText = Number(cartCount.innerText) - foundInShopCart.count;
                    cart = cart.filter((product) => {
                        if (product.name != itemName) {
                            return product;
                        }
                    });
                    updateDisplay();
                    break;
            }
            break;
            //end of undefined case for found in food inventory
        case foundInFoodInventory:
            //food inventory total count => 15
            //i could take the shop count and add it back to the inventory count in the foods
            /* if i did not hide the button => add one burger (shop cart) and have 14 food inventory (food inventory) 
            i will add the difference and place that number back into the found in food inventory count for that specific 
            product
            */
            foundInFoodInventory.count = foundInShopCart.count + foundInFoodInventory.count;
            cartCount.innerText = Number(cartCount.innerText) - foundInShopCart.count;
            cart = cart.filter((product) => {
                if (product.name != itemName) {
                    return product;
                }
            });
            updateDisplay();
            break;
    }

}


function generateCart() {
    display_cart.innerHTML = ""
    cart.forEach((item) => {
        return display_cart.innerHTML = display_cart.innerHTML + `<li>
    <img src="${item.img}">
    <div>
        <p>${item.name}</p>
        <p>price: $${item.price}</p>
    </div>
    <div class="cart-buttons">
        <button name="add" value="${item.name}" data-max="${item.count}">+</button>
        <span><strong>Count: ${item.count}</strong></span>
        <button name="remove" value="${item.name}">-</button>
    </div>
</li>`
    });
    getTotal();
}

function getTotal() {

    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        total = total + (cart[i].count * cart[i].price);
    }
    total_display.innerHTML = `<p><strong>Total: $${total.toFixed(2)}</strong></p>`
}


function checkout(event, cart, customerNameInput) {
    event.preventDefault();
    if (customerNameInput.value == "") {
        noNameError.innerText = `please, enter your name to checkout!`;
    } else if (cart.length <= 0) {
        no_items.innerHTML = `<p>please add an item to the cart to check out</p>`;

    } else {
        /* use the isSelected property for the admin page to see other people carts */
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].name) {
                cart[i].customer = customerNameInput.value;
                break;
            }

        }
        localStorage.setItem('cart', JSON.stringify(cart));
        window.location.href = "checkout.html"
    }
}

window.onload = () => {

}