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

  
function checkIfFieldIsValid(input, regExp) {
  return input.value.match(regExp) !== null;
}

let productsID = [];

function restartForm(){

  //Reinisialisation du formulaire

  let inputs = document.querySelectorAll("input");
  for (let i = 0; i < inputs.length ; i++) {
    inputs[i].classList.remove("is-invalid");
    inputs[i].classList.remove("is-valid");

  }

  let alertMessages = document.querySelectorAll(".alertMessages");
  for (let i = 0; i < alertMessages.length ; i++) {
    alertMessages[i].remove();
  };

  //Récupérer les informations du formulaire

  var firstName = document.querySelector("#firstName"),
    lastName = document.querySelector("#lastName"),
    address = document.querySelector("#address"),
    city = document.querySelector("#city"),
    email = document.querySelector("#email");

  //Définition des expressions régulières pour la vérification de la validité des champs
  let stringRegExp = /([A-Za-z0-9_\s\-'\u00C0-\u024F]+)/;
  emailRegExp = /^([\w\-\.]+)@((?:[\w]+\.)+)([a-zA-Z]{2,4})/i;

  //Vérification de la validité des champs
  let isfirstNameValid = checkIfFieldIsValid(firstName, stringRegExp);
    isLastNameValid = checkIfFieldIsValid(lastName, stringRegExp);
  isAddressValid = checkIfFieldIsValid(address, stringRegExp);
  isCityValid = checkIfFieldIsValid(city, stringRegExp);
  isEmailValid = checkIfFieldIsValid(email, emailRegExp);

  //Alerter l'utilisateur s'il a mal rempli le formulaire
let fields = [firstName, lastName, address, city, email],
    fieldsValidity = [isfirstNameValid, isLastNameValid, isAddressValid, isCityValid, isEmailValid],
    isAFieldInvalid = false;

  for (let i = 0; i < fields.length; i++) {
    if (!fieldsValidity[i]) { //si un champ n'est pas valide
      isAFieldInvalid = true; //un champ au moins est incorrect, sera utilisé plus loin pour empêcher la requête POST à l'API

      //Création du message à envoyer à l'utilisateur
      let message;
      if (fields[i] === document.querySelector("#firstName")) {
        message = "Le prénom est incorrect !";
      } else if (fields[i] === document.querySelector("#lastName")) {
        message = "Le nom est incorrect !";
      } else if (fields[i] === document.querySelector("#address")) {
        message = "L'adresse postale est incorrecte !";
      } else if (fields[i] === document.querySelector("#city")) {
        message = "La ville est incorrecte !";
      } else if (fields[i] === document.querySelector("#city")) {
        message = "L'adresse mail est incorrecte !";
      }

      //Création et stylisation de l'alerte
      let alert = document.createElement("div");
      alert.appendChild(document.createTextNode(message));
      fields[i].classList.add("is-invalid");
      alert.classList.add("alertMessages", "invalid-feedback");
      fields[i].parentElement.appendChild(alert);

    } else {
      fields[i].classList.add("is-valid");
    }
  }
  //Si l'un des champs a été vidé ...
  if (isAFieldInvalid) return; //la fonction s'arrête 
  //sinon on continue

    let contact = {
      firstName: firstName.value,
      lastName: lastName.value,
      address: address.value,
      city: city.value,
      email: email.value
    },
      products = productsID;
    //Récupérer l'orderId
    fetch('http://localhost:3000/api/cameras/order', {
      method: 'post',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ //On convertit les données au format JSON
        contact: contact,
        products: products
      })
    })
      .then(response => response.json())
      .then(order => {
        localStorage.setItem("orderId", order.orderId); //On definit orderID
        window.location.href = "confirmation.html"; // On redirige
      })
      .catch(error => alert("Un des champ du formulaire n'est pas correct !"));
  }


document.querySelector("#submitPayment").addEventListener("click", restartForm, true);