// recupere Id commande

let orderId = localStorage.getItem('orderId');

//recupere le prix total de la commande

let totalPriceInCart = localStorage.getItem('totalPriceInCart');

//recupere les information de la commande

const orderNo = document.getElementById('orderNo');
orderNo.textContent = "Numéro de commande : " + orderId;


const totalOrder = document.getElementById('totalOrder');
totalOrder.textContent = "Montant total de votre commande : " + totalPriceInCart / 100 + ".00 €";


localStorage.clear();