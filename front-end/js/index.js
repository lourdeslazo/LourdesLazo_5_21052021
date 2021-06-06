//Fonction principale, gere le temps de telechargement
(async function() {
    const articles = await getArticles()

    //Cree la boucle des produits
    for (article of articles) {
        displayArticle(article)
    }
})()

async function getArticles(){
    try {
        //Appelle la reponse de l'api
        const httpBodyResponse = await fetch("http://localhost:3000/api/cameras")
        const articles = await httpBodyResponse.json()
        return articles
    } catch (error) {
        alert(error)
    }
}

//Gere laffichage des produits

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

    //Affiche lelement enfant clone
    
    document.getElementById("main").appendChild(cloneElt)

}

