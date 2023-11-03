let heart = document.getElementById('heart')





// heart.onclick = function uno(){
//     if(){

//     }
// }

let IconC = document.querySelector('.icon-cart')
let body = document.querySelector('body')
let closeCart = document.querySelector('.close')
let ListProductHtml = document.querySelector('.listProduct')
let ListCartHtml = document.querySelector('.listCart')
let iccSpan = document.querySelector('.icon-cart span')



let listProducts = []
let cart = []



IconC.addEventListener('click',() =>{
    body.classList.toggle('showCart')
})

closeCart.addEventListener('click',() =>{
    body.classList.toggle('showCart')
})

const addDataToHtml = () =>{
    ListProductHtml.innerHTML = '';
    if(listProducts.length > 0){
listProducts.forEach(product =>{
    let newP = document.createElement('div')
    newP.classList.add('item');
    newP.dataset.id = product.id
    newP.innerHTML = `
    <i class='bx bx-heart' id="heart"></i>
    <img src="${product.image}" alt="">
    <h2>${product.name}</h2>
    <div class="price">${product.price}</div>
    <button class="add-cart">Add to cart</button>`;
    ListProductHtml.appendChild(newP);
})
    }
}

ListProductHtml.addEventListener('click',(event) =>{
    const positionC = event.target;
if(positionC.classList.contains('add-cart')){
    let product_id = positionC.parentElement.dataset.id;
    addToCart(product_id)
}

//


})
ListProductHtml.addEventListener('click',(happ) =>{
    const positionD = happ.target;
if(positionD.classList.contains('bx-heart')){
    alert('Item added to Favourites')
    positionD.classList.replace('bx-heart' , 'bxs-heart')
    } 
    else if(positionD.classList.contains('bxs-heart')){
        positionD.classList.replace('bxs-heart' , 'bx-heart')
    alert('Item removed from Favourites')

    }})
    //

const addToCart = (product_id) => {
let positionInCart = cart.findIndex((value)=> value.product_id == product_id )
if(cart.length <= 0){
cart =[{
    product_id: product_id,
    quantity:1
}]
}

else if(positionInCart < 0){
cart.push({
    product_id: product_id,
    quantity:1

})
}else{
cart[positionInCart].quantity += 1
}
addCartToHtml();
addToMemory()
}

const addToMemory = () => {
    localStorage.setItem('cart', JSON.stringify(cart))
}

const addCartToHtml = () =>{
    ListCartHtml.innerHTML = ''
    let totalQ = 0
    if(cart.length > 0){
        cart.forEach(cart => {
            totalQ += cart.quantity
            let newCart = document.createElement('div');
            newCart.classList.add('item')
            newCart.dataset.id = cart.product_id
            let positionProduct = listProducts.findIndex((value) => value.id == cart.product_id)
            let info = listProducts[positionProduct]
            newCart.innerHTML = `   <div class="image">
            <img src="${info.image}" alt="">
        </div>
        <div class="name">
        ${info.name}
        </div>
        <div class="totalPrice">
        ${info.price * cart.quantity}
        </div>
<div class="quantity">
<span class="minus">-</span>
<span >${cart.quantity}</span>
<span class="plus">+</span>
</div>`
ListCartHtml.appendChild(newCart)
        })
    }
    iccSpan.innerText = totalQ
}

ListCartHtml.addEventListener('click', (event)=>{
let positionC =event.target
if(positionC.classList.contains('minus') || positionC.classList.contains('plus') ){
let product_id = positionC.parentElement.parentElement.dataset.id;
let type = 'minus';
if(positionC.classList.contains('plus')){
     type = 'plus';

}
changeQt(product_id, type)
      }
})

const changeQt = (product_id, type) => {
    let positionC = cart.findIndex((value) => value.product_id == product_id)
    if(positionC >= 0){
        switch (type) {
            case 'plus':
                cart[positionC].quantity += 1
                break;
        
            default:
                let vc =  cart[positionC].quantity - 1
if(vc > 0){
    cart[positionC].quantity = vc
}else{
    cart.splice(positionC, 1)
}

                break;
        }

    }
    addToMemory();
    addCartToHtml();
}
const initApp = () => {
   fetch('products.json')
   .then(response => response.json())
.then(data => {
    listProducts = data;
addDataToHtml();
//to get from memory
if(localStorage.getItem('cart')){
cart = JSON.parse(localStorage.getItem('cart'))
addCartToHtml()
}
})

}
initApp()