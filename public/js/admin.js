$("#nav-dashboard").css("background-color","#08588c");
$("#nav-dashboard").css("color","#fff");

$(".nav-label").mousedown(function(){
    $(".nav-label").css("background-color","#fff");
    $(".nav-label").css("color","#08588c");
    $(this).css("background-color","#08588c");
    $(this).css("color","#fff");
    if ( $(this).attr("id")=="nav-dashboard"){
       
    }
    else if ( $(this).attr("id")=="nav-product"){

    }
    else{

    }
});

function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
