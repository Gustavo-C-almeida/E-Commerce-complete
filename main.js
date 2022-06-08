let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");
//finalizar compra
function Buy(){
    alert('Seu pedido foi feito com sucesso!')
    var cartContent = document.getElementsByClassName('cart-content')[0]
    while (cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild);
    }
    updatetotal();
}
//abrir carrinho
cartIcon.onclick = () =>{
    cart.classList.add("active");
}
//fechar carrinho
closeCart.onclick = () =>{
    cart.classList.remove("active");
}
//função do carrinho
if (document.readyState == "loading"){
    document.addEventListener("DOMContentLoaded", ready);
} else{
    ready();
}
function ready(){
 var removecartbtns = document.getElementsByClassName("cart-remove");
 for (var i = 0; i < removecartbtns.length; i++) {
     var bt = removecartbtns[i];
     bt.addEventListener('click', removecartitem);
 }

}
 var quantityInputs = document.getElementsByClassName('cart-quantity');
 for (var i = 0; i < quantityInputs.length; i++){
     var input = quantityInputs[i];
     input.addEventListener('change', quantityChanged);
 }
 var addcart = document.getElementsByClassName('add-cart');
 for (var i = 0; i < addcart.length; i++){
     var bt = addcart[i];
     bt.addEventListener("click", addCartClicked);
 }

function removecartitem(event){
var btclicked = event.target;
btclicked.parentElement.remove();
updatetotal();
}
function quantityChanged(event){
    var input = event.target;
    if(isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updatetotal();
}
function addCartClicked(event){
var bt = event.target;
var shopProducts = bt.parentElement;
var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
var price = shopProducts.getElementsByClassName("price")
[0].innerText;
var productimg = shopProducts.getElementsByClassName("product-img")[0].src;
addProductToCart(title, price, productimg);    
updatetotal();
}
function addProductToCart(title, price, productimg) {
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    var cartItems = document.getElementsByClassName("cart-content")[0];
    var cartItemsnames = cartItems.getElementsByClassName("cart-product-title");
    for (var i = 0; i < cartItemsnames.length; i++) {
        if (cartItemsnames[i].innerHTML == title) {
            alert("Você já tem esse item no carrinho");
        return;
    }

  }
var cartBoxContent = `
<img src="${productimg}" alt="" class="cart-img">
<div class="details-box">
    <div class="cart-product-title">${title}</div>
    <div class="cart-price">${price}</div>
    <input type="number" value="1" class="cart-quantity">
</div>
<i class='bx bxs-trash-alt cart-remove'></i>`;
cartShopBox.innerHTML = cartBoxContent
cartItems.append(cartShopBox);
cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener("click", removecartitem);
cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener("change", quantityChanged);
}
function updatetotal(){
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    var total = 0;
    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName("cart-price")[0];
        var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        var price = parseFloat(priceElement.innerText.replace("R$", ""));
        var quantity = quantityElement.value;
        total = total + (price * quantity);

    }
    total = Math.round(total * 100) / 100;

    document.getElementsByClassName("total-price")[0].innerText = 'R$' + total;
}