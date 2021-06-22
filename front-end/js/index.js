//Fonction principale, gère le temps de téléchargement
(async function() {
    const articles = await getArticles()

    //Crée la boucle des produits
    for (article of articles) {
        displayArticle(article)
    }
})()

async function getArticles(){
    try {
        //Appelle l'Api
        const httpBodyResponse = await fetch("http://localhost:3000/api/cameras")
        const articles = await httpBodyResponse.json()
        return articles
    } 
    catch (error) {
        alert(error)
    }
}

//Gère l'affichage des produits

function displayArticle(article){
    //Appelle le temmplate
    const templateElt = document.getElementById("templateArticle")

    //Clone le template
    const cloneElt = document.importNode(templateElt.content, true)

    cloneElt.getElementById("name").textContent = article.name
    cloneElt.getElementById("price").textContent = `${article.price / 100}.00 €`
    cloneElt.getElementById("description").textContent = article.description
    cloneElt.getElementById("imageUrl").src = article.imageUrl
    cloneElt.getElementById('articleLink').href = `product.html?id=${article._id}`

    //Crée l'élément enfant "clone"
    
    document.getElementById("main").appendChild(cloneElt)
}

