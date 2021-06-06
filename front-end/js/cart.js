//gere les produits ajoutes

let addToCart = JSON.parse(localStorage.getItem("cart"));

const cartContent = document.querySelector("#itemsInCart");
console.log(cartContent);

let showCart = [];

if(addToCart === null || addToCart == 0 ) {
    const emptyCart = `
    <div>
       Votre panier est vide, choississez le produit de votre preference!
    </div>
    `;

    cartContent.innerHTML = emptyCart;

} else {
    for (j = 0; j < addToCart.length; j++) {
        showCart = showCart + `
        <div class="content">
            <div>
                <p>${addToCart[j].name}</p>
                <img src=${addToCart[j].imageUrl} 
                   width="150"
                   height="100"
                />
            </div>
            <div>         
                <p>${addToCart[j].chosenLense}</p>
            </div>
            <div>
                <p>${addToCart[j].price / 100}.00 €</p>
            </div> 
        </div>   
        `;
    }

    if(j == addToCart.length) {
        cartContent.innerHTML = showCart;
    }
}

//total du panier//

let totalCart = [];

for (let k = 0; k < addToCart.length; k++){
    let priceArticlesInCart = addToCart[k].price;

    totalCart.push(priceArticlesInCart)
}

const reducer = (accumulator, currentValue) => accumulator + currentValue;
const totalPriceInCart = totalCart.reduce(reducer,0);
console.log(totalPriceInCart);

cartContent.innerHTML += `
    <div class="total">
        <div>
            <p>Total de la commande : </p>
        </div>
        <div>
            <p class="total-price" >${totalPriceInCart / 100}.00 €</p>
        </div>
    </div>`;


//gere "passer la commande"

document.querySelector('.form input[type="button"]').addEventListener("click", function(){
    var valid = true;
    for(let input of document.querySelectorAll(".form input")){
        valid &= input.reportValidity();
        if(!valid){
            break;
        }
    }
    if(valid){
        alert("votre message a bien ete envoye!");
    }
});