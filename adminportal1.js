//Instructions
//To get to the password/admin page edit the link to https://jackyhxz.github.io/STAB-Library/admin.html
//Then enter the password 


// password name
var password = "stabexlibris"; 

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

// Repeatedly prompt for user password until success: 
// set cookie for one day, so the user who has visited the admin page don't have to type in the password for a day
(function promptPass() {
  let username = getCookie("username");
  console.log(username);
  if (username != "") {
    // if password is correct it will say welcome and let you use continue to the admin page
    alert('WELCOME BACK');
  } else {
    var psw = prompt("Enter your Password");

    while (psw !== password) {
      alert("Incorrect Password");
      return promptPass();
    }
    setCookie("username", "admin", 1);
    alert('WELCOME');
  }
}());