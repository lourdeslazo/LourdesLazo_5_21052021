document.querySelector('.form input [type="button"]')
.addEventListener("click", function(){
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