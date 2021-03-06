// Gère la page produits
let params = (new URL(document.location)).searchParams;
let id = params.get("id");

// Affiche le produit selectioné 
function showArticles(article) {
  document.getElementById('articleImage').src = article.imageUrl
  document.getElementById('articleName').textContent = article.name
  document.getElementById('articleDescription').textContent = article.description
  document.getElementById('articlePrice').textContent = `${article.price / 100}.00 €`
  choiceLenses = document.querySelector("select");

  for (i = 0; i < article.lenses.length; i++) {
    let option = document.createElement("option");
    option.textContent = article.lenses[i];
    choiceLenses.appendChild(option);
  }
}

// Appelle l'Api pour récupérer le produit
function getArticle(id) {
  fetch("http://localhost:3000/api/cameras/" + id)
    .then(response => response.json())
    .then(article => {
      showArticles(article);
        
      // Ecoute les clics sur le bouton addToCart
      let addItemToCart = document.querySelector("#addToCart");
      addItemToCart.addEventListener("click", function () {
        
        addToCart(article);
        alert("Produit ajouté au panier");
      });
    })

  .catch(function() {
  });
}

// Gère le panier
function addToCart(article) {
    
  //Création du panier dans le localStorage s'il n'existe pas déjà
  if (typeof localStorage.getItem("cart") !== "string") {
    let cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  //Récupère les informations du produit
  article.chosenLense = document.querySelector("option:checked").innerText;
  delete article.lenses;
    
  //Création d'une variable pour manipuler le panier
  let cart = JSON.parse(localStorage.getItem("cart"));
    
  //Vérification que l'item n'existe pas déjà dans le panier
  let isThisItemExist = false;
  let existingItem;
  for (let i = 0; i < cart.length; i++) {
    if (article._id === cart[i]._id && article.price === cart[i].price && article.chosenLense === cart[i].chosenLense) {
      isThisItemExist = true;
      existingItem = cart[i];
    }
  }
    
  //Ajoute le produit dans le panier
  if (!isThisItemExist) {
    cart.push(article);  
  } 
     
  localStorage.setItem("cart", JSON.stringify(cart));  
}
  
getArticle(id);