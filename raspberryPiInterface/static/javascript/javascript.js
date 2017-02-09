var clicked = function(element){
    var hiddenDiv = element.getElementsByClassName("accountDetails")[0];
    if(hiddenDiv.style.display == "none"){
        hiddenDiv.style.display = "inherit";
    }
    else{
        hiddenDiv.style.display = "none";
    }
    console.log("jesus")
}

document.getElementById("addAccount").addEventListener("click",function(){
    console.log("clicked")
    var hiddenDiv = document.getElementById("form");
    if(hiddenDiv.style.display == "none"){
        hiddenDiv.style.display = "inherit";
    }
    else{
        hiddenDiv.style.display = "none";
    }
})