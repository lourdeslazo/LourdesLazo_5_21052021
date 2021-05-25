(async function() {
    const articles = await getArticles()

    for (article of articles) {
        displayArticle(article)
    }
})()

function getArticles(){
    return fetch("http://localhost:3000/api/cameras")
    .then(function(httpBodyResponse) {
        return httpBodyResponse.json()
    })
    .then(function(articles) {
        return articles
    })
    .catch(function(error) {
        alert(error)
    })
}

function displayArticle(article){
    const templateElt = document.getElementById("templateArticle")
    const cloneElt = document.importNode(templateElt.content, true)

    cloneElt.getElementById("name").textContent = article.name
    cloneElt.getElementById("price").textContent = article.price
    cloneElt.getElementById("description").textContent = article.description
    cloneElt.getElementById("imageUrl").src = article.imageUrl
    document.getElementById("main").appendChild(cloneElt)

}

