// affiche les produits

let params = (new URL(document.location)).searchParams;
let id = params.get("id");

function articles(article) {
    document.getElementById('articleImage').src = article.imageUrl
    document.getElementById('articleName').textContent = article.name
    document.getElementById('articleDescription').textContent = article.description
    document.getElementById('articlePrice').textContent = `${article.price / 100}.00 €`
}

//gere appel a lapi 

function getArticles(id) {
    fetch(apiUrl + "/api/cameras/" + id)
      .then(response => response.json())
      .then(article => {
        articles(article);
        
    })
    .catch(function() {
        console.log('Erreur de chargement');
    });
  }

getArticles(id);

//gere le menu deroulant

let camLenses;
const lenses = document.getElementById('lenses');

fetch(apiUrl + "/api/cameras/" + id)
.then(async result_ => {
    const result = await result_.json()
    camLenses = result
    lensesList()

})
.catch((error) => {
    console.log(error);
})

const lensesList = () => {
    for (let i = 0; i < camLenses.lenses.length; i++) {
        const option = document.createElement("option")
        option.setAttribute("value", camLenses.lenses[i])              
        option.innerHTML = camLenses.lenses[i]
        lenses.appendChild(option)
    }
}

//Gere le bouton ajouter au panier
function addToCart(lenseSelected){
    let cartContent = JSON.parse(localStorage.getItem("cartContent"));
    if(cartContent === null) {
        cartContent = [];
    }

    let lense = new Lense(id, lenseSelected);

    cartContent.push(lense);
    localStorage.setItem("cartContent", JSON.stringify(cartContent));
}

btn.addEventListener("click", function(){
    const lenses = getElementByTagName("select");
    const lenseSelected = lenses[0].value;

    addToCart(lenseSelected);
    alert("ajoute au panier");
});