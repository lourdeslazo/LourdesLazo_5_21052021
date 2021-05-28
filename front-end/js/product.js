(async()=> {
    const articleId = getArticleId()
    console.log(articleId);
    const articleData = await getArticleData(articleId)
    
    refreshPage(articleData)
    console.log(articleData);  
})()

function getArticleId(){
    return new URL(window.location.href).searchParams.get('id')
}

function getArticleData(articleId){
    return fetch(apiUrl + "/api/cameras/" + articleId)
    .catch((error)=> {
        console.log(error);
    })
    .then((httpBodyResponse)=> httpBodyResponse.json())
    .then((articleData)=> articleData)
}

function refreshPage(article){
    document.getElementById('articleImage').src = article.imageUrl
    document.getElementById('articleName').textContent = article.name
    document.getElementById('articleDescription').textContent = article.description
    document.getElementById('articlePrice').textContent = `${article.price / 100}.00 €`
}

document.getElementById('addToCart').onclick = (event) =>{
    event.preventDefault()
    localStorage?????
    Cart.addArticle(article)
    redirectionToCart(article.name)
}

function redirectionToCart(articleName) {
    window.location.href = `${window.location.origin}/cart.html?lastAddedArticleName=${articleName}`
}