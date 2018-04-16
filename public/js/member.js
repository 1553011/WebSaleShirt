// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("btn_update");
var btnUpdate = document.getElementById("btn_update_box");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
    document.getElementById('edt_first_name').value=document.getElementById('first_name').textContent;
    document.getElementById('edt_last_name').value=document.getElementById('last_name').textContent;
    document.getElementById('edt_phone').value=document.getElementById('phone').textContent;
    document.getElementById('edt_address').value=document.getElementById('address').textContent;
}

btnUpdate.onclick= function() {
    document.getElementById('first_name').textContent=document.getElementById('edt_first_name').value;
    document.getElementById('last_name').textContent=document.getElementById('edt_last_name').value;
    document.getElementById('phone').textContent= document.getElementById('edt_phone').value;
    document.getElementById('address').textContent= document.getElementById('edt_address').value;
    modal.style.display = "none";    
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

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
