if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready);
}else{
    ready()
}


const toggleBtn = document.querySelector(".toggle_btn");
const toggleBtnIcon = document.querySelector(".toggle_btn i");
const dropDownMenu = document.querySelector(".dropdown_menu");
var openModal = document.querySelector('.modal');
const actionBtn = document.querySelector('.action-btn');
const clicker = document.getElementsByClassName("navbar");
const modalActionBtn = document.getElementById("action");

const total = document.getElementsByClassName("total")[0];
const buttonPurchase = total.getElementsByClassName("btn-purchase");
const cartItems = document.getElementById("cartItem")




toggleBtnIcon.onclick = function(){
    dropDownMenu.classList.toggle("open");
    const isOpen = dropDownMenu.classList.contains('open');
    toggleBtnIcon.classList = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
}

modalActionBtn.addEventListener("click", modalopen)

actionBtn.addEventListener("click", modalopen);

function modalopen(){
    openModal.style.display = "block";
    var cartItems = document.getElementsByClassName("cart-items")[0];
    // Select the first element
    if (!cartItems || !cartItems.hasChildNodes()) {
        cartItems.innerHTML = "YOUR CART IS EMPTY";
        if (buttonPurchase) {
            buttonPurchase[0].disabled = true; // Set disabled property of the button if it exists
        } // Set disabled property of the button
    } else {
        updateCartTotal(); // This line seems unnecessary and might cause issues
    }
}






function ready(){
    var removeCartItemButtons = document.getElementsByClassName("btn-danger");

    for(var i = 0; i < removeCartItemButtons.length; i++){
    var button = removeCartItemButtons[i];
    button.addEventListener("click", removeCartItem);
    }
    var quantityInputs = document.getElementsByClassName("input-quantity");
    for(var i = 0; i < quantityInputs.length; i++){
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
    }
    var addToCartButtons = document.getElementsByClassName("add-item");
    for(var i = 0; i < addToCartButtons.length; i++){
        var button = addToCartButtons[i];
        button.addEventListener("click", addtoCartClicked);
    }

    document.getElementsByClassName("btn-purchase")[0].addEventListener('click',purchaseClicked);
    document.getElementsByClassName("btn-back")[0].addEventListener('click', function(){
        var openModal = document.querySelector('.modal');
        openModal.style.display = "none";
    })
}

function purchaseClicked() {
    var cartItems = document.getElementsByClassName("cart-items")[0];
    if (!cartItems || !cartItems.hasChildNodes()) {
        alert("Your cart is empty");
    } else {
        while (cartItems.hasChildNodes()) {
            cartItems.removeChild(cartItems.firstChild);
        }
        updateCartTotal();
        cartItems.innerHTML = "YOUR CART IS EMPTY";
        buttonPurchase[0].disabled = true;
        alert("Thank you for your purchase");
        
    }
    saveData();
}


function quantityChanged(event){
    var input = event.target;
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1;
    }
    updateCartTotal();
    saveData();
}

function removeCartItem(event){
       var buttonClicked = event.target;
       buttonClicked.parentElement.remove();
       var cartItems = document.getElementsByClassName("cart-items")[0];
       console.log("clicked")
       updateCartTotal();
       if(!cartItems || !cartItems.hasChildNodes()){
            cartItems.innerHTML = "YOUR CART IS EMPTY"
       }else{
        updateCartTotal()
        buttonPurchase[0].disabled = true;
       }
}

function addtoCartClicked(event){
    var button = event.target;
    var shopItem = button.parentElement
    var title = shopItem.getElementsByClassName("title-item")[0].innerText;
    var price = shopItem.getElementsByClassName("price-item")[0].innerText;
    var imageSrc = shopItem.getElementsByClassName("img-item")[0].src;
    console.log(title, price, imageSrc);
    addItemtToCart(title, price, imageSrc);
    updateCartTotal();
    saveData();
}

function addItemtToCart(title, price, imageSrc){
    var cartRow = document.createElement('div');
    cartRow.classList.add("item-info");
    var cartItems = document.getElementsByClassName('cart-items')[0];
    var cartItemNames = cartItems.getElementsByClassName('title-item');
    for(var i = 0; i < cartItemNames.length; i++){
        if(cartItemNames[i].innerText == title){
            alert("This Item is already to the Cart");
            return;
        }
    }
    var cartRowsContents = `
    <img class="img-item" src="${imageSrc}" alt="" width="240" height="100" />
    <h1 class="title-item">${title}</h1>
    <p class="price-item">${price}</p>
    <input class="input-quantity" type="number" value="1">
    <button class="btn btn-danger">Remove</button>`;
    cartRow.innerHTML = cartRowsContents;
    cartRow.setAttribute("id", "btnRemove");
    cartItems.append(cartRow);
    cartRow.getElementsByClassName("btn-danger")[0].addEventListener("click", removeCartItem);
    cartRow.getElementsByClassName("input-quantity")[0].addEventListener("change", quantityChanged)
    saveData();
}
function updateCartTotal(){
    var cartItemContainer = document.getElementsByClassName("cart-items")[0];
    var cartRows = cartItemContainer.getElementsByClassName("item-info");
    var total = 0;
    for(var i = 0; i < cartRows.length; i++){
       var cartRow = cartRows[i];
       var priceElement = cartRow.getElementsByClassName("price-item")[0];
       var quantityElement = cartRow.getElementsByClassName("input-quantity")[0];
      var price = parseFloat(priceElement.innerText.replace('$', ''));
      var quantity = quantityElement.value;
      total = total + (price * quantity);
      saveData();
    }
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName("total-price")[0].innerText = `Total : $${total}`;

    saveData();

}

// TODO this function is recalling the ready(); to ensure the all buttons after the refersh of the page is all wroking
function callReadyFunc(){
    ready();
}


function saveData(){
    localStorage.setItem("data", cartItems.innerHTML);

}
function getItem(){
    cartItems.innerHTML = localStorage.getItem("data");
}

getItem();
callReadyFunc();




// for open another menu

var prevButton = null;
var menus = document.getElementsByClassName("special-menu");

function menuButton() {
    var buttonMenus = document.getElementsByClassName('samp');
    for (var i = 0; i < buttonMenus.length; i++) {
        var buttons = buttonMenus[i];
        console.log(buttons)
        buttons.addEventListener("click", addButtonColor);
    }
}

function addButtonColor(e){
    var button = e.target;
    var buttonOptions = button.parentElement
    var addColor = buttonOptions.getElementsByClassName("option-button")[0];
    if (prevButton && prevButton !== button) {
        var prevButtonOptions = prevButton.parentElement;
        var prevAddColor = prevButtonOptions.getElementsByClassName("option-button")[0];
        prevAddColor.style.background = ""; // Restore original color
    }
    // Change the background color of the clicked button
    addColor.style.background = "#ece8d5";
    // Update the reference to the previously clicked button
    prevButton = button;
    
}
menuButton();
function openMenu(menuIndex) {
    var coffeCups = document.getElementsByClassName("special-menu");
    for (var i = 0; i < coffeCups.length; i++) {
        if (i === menuIndex) {
            coffeCups[i].style.display = "flex";
        } else {
            coffeCups[i].style.display = "none";
        }
    }
}


// TODO : Call openMenu with the corresponding index to open the desired menu
function open1() {
    openMenu(0);
}
function open2() {
    openMenu(1);
}

function open3() {
    openMenu(2);
}

function open4() {
    openMenu(3);
}

// // for sending email to google

// function sendEmail(){
//         Email.send({
//             Host : "smtp.gmail.com",
//             Username : "avinash6252@gmail.com",
//             Password : "Damn",
//             To : 'arviecerda@gmail.com',
//             From : document.getElementById("email").value,
//             Subject : "New Contact Form Enquiry",
//             Body : "Name: " + document.getElementById("name").value + "<br> Email: " + document.getElementById("email").value + "<br> Phone No. : " + document.getElementById("phone").value + "<br> Message : " + document.getElementById("message").value
//         }).then(
//         message => alert(message)
//         );
// }

// TODO : FOR ANIMATION SCROLL ANIMATION

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry)
        if(entry.isIntersecting){
            entry.target.classList.add('show');
        }else{
            entry.target.classList.remove('show');
        }
    });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

