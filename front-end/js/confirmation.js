// Récupère l'Id de la commande
let orderId = localStorage.getItem('orderId');

// Récupère le prix total de la commande
let totalPriceInCart = localStorage.getItem('totalPriceInCart');

// Récupère les informations de la commande
const orderNo = document.getElementById('orderNo');
orderNo.textContent = "Numéro de commande : " + orderId;

const totalOrder = document.getElementById('totalOrder');
totalOrder.textContent = "Montant total de votre commande : " + totalPriceInCart / 100 + ".00 €";

localStorage.clear();