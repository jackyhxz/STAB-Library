//Instructions
//To get to the password/admin page edit the link to https://jackyhxz.github.io/STAB-Library/admin.html
//Then enter the password 


// password name
var password = "SisterPirateJenny"; 

// Repeatedly prompt for user password until success:
(function promptPass() {

  var psw = prompt("Enter your Password");

  while (psw !== password) {
    alert("Incorrect Password");
    return promptPass();
  }

}());

// if password is correct it will say welcome and let you use continue to the admin page
alert('WELCOME');