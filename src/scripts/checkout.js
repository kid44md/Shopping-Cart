var checkoutCart = JSON.parse(localStorage.getItem('cart'));
var display_cart = document.getElementById('cart-list');
var customer_name_display = document.getElementById('customer-cart-name')
var total_display = document.getElementsByClassName('total')[0];
var change_display = document.getElementsByClassName('change')[0];
var customer_name;
var payment_customer_name = document.getElementsByClassName('payment-customer-name')[0];
var total;
var pay_button = document.getElementById('payment-button');
var success = document.getElementsByClassName('successful-payment-container')[0];
for (let i = 0; i < checkoutCart.length; i++) {
    if (checkoutCart[i].customer) {
        customer_name_display.innerText = `${checkoutCart[i].customer}'s Cart`;
        customer_name = checkoutCart[i].customer;
        break;
    }
}





document.addEventListener('DOMContentLoaded', updateDisplay);
pay_button.addEventListener('click', paymentSubmit);

function updateDisplay() {
    generateCart();
    payment_customer_name.innerHTML = `<label for="customer-name">Customer Name</label>
                <input type="text" value="${customer_name}" disabled></input>`
}

function generateCart() {
    display_cart.innerHTML = ""
    checkoutCart.forEach((item) => {
        return display_cart.innerHTML = display_cart.innerHTML +
            `<li>
    <img src="${item.img}">
    <div>
        <p>${item.name}</p>
        <p>price: $${item.price}</p>
        <p>Count: ${item.count}</p>
    </div>
</li>`
    });
    total = getTotal(checkoutCart);
}


function getTotal(checkoutCart) {
    let total = 0;
    for (let i = 0; i < checkoutCart.length; i++) {
        total = total + (checkoutCart[i].count * checkoutCart[i].price);
    }
    total_display.innerHTML = `<p><strong>Total: $${total.toFixed(2)}</strong></p>`;
    return total.toFixed(2);
}


function paymentSubmit(event) {
    let address = document.getElementsByName('address')[0].value;
    let city = document.getElementsByName('City')[0].value;
    let state = document.getElementsByName('State')[0].value;
    let zipcode = document.getElementsByName('zip')[0].value;
    let payment = Number(document.getElementsByName('payment')[0].value);
    let error_form = document.getElementById('error-form');
    let error_payment = document.getElementById('error-payment');

    let change = payment - total;

    if (!address) {
        error_form.innerText = "(ADDRESS MISSING)- please, enter an address";
    } else if (!city) {
        error_form.innerText = "(CITY MISSING)- please, enter an city";
    } else if (!state) {
        error_form.innerText = "(STATE MISSING)- please, enter an state";
    } else if (!zipcode) {
        error_form.innerText = "(ZIPCODE MISSING or INVALID ZIPCODE)- please, enter an zip code";
    } else if (!payment) {
        error_payment.innerText = "(MISSING PAYMENT)- please, enter a payment";
    } else {
        if (payment < total) {
            error_payment.innerText = "Your payment is enough to complete the transaction";
        } else {
            error_payment.innerText = "";
            change_display.innerHTML = `<p><strong>Your change is: $${change.toFixed(2)}</strong></p>`;
            total_display.innerHTML = "";
            success.innerHTML = "<h3>Your payment is sucessful!....food is on the way</h3>";
            setTimeout(() => {
                localStorage.removeItem('cart');
                window.location.assign("http://127.0.0.1:3000/Shopping-Cart/frontPage.html");
            }, 5000)
        }
    }
}