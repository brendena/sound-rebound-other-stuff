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


var deleteicon = document.getElementsByClassName("deleteButton");

var myFunction = function() {
    console.log("clicked delete")
    
    data={
        "disconnectEmail":$(this).parent().find(".accountId").attr('address')
    }
     $.ajax({
        type : "POST",
        data: JSON.stringify(data, null, '\t'),
        contentType: 'application/json;charset=UTF-8',
        success: function(result) {
            console.log(result);
        }
    });
    
};

for (var i = 0; i < deleteicon.length; i++) {
    deleteicon[i].addEventListener('click', myFunction, false);
}