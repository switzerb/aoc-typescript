
var alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];

//var input ="hepxcrrq";
var input = "hepxxyzz";

function findPassword(newPassword) {
  while (true) {
    newPassword = incrementPassword(newPassword);
    if ((containsStraight(newPassword)) && !(containsBadLetters(newPassword)) && (containsPairs(newPassword))) {
      return newPassword;
    }
  }
}

function incrementPassword(password) {

  password = password.split("");

  for(var i = 7; i > 0; i--) {

    if (password[i] == "z") {
      password[i] = alphabet[0];

    } else {
        var position = alphabet.indexOf(password[i]);
        password[i] = alphabet[position + 1];
        return password.join("");
    }

  }

}

function containsStraight(password) {
  var flag = false;

  for (var i= 0, len = alphabet.length - 2; i < len; i++) {
    var consecutive = alphabet[i] + alphabet[i+1] + alphabet[i+2];
    if (password.indexOf(consecutive) != -1) {
      flag = true;
    }
  }
  return flag;
}

function containsBadLetters(password) {
  //Passwords may not contain the letters i, o, or l, as these letters can be mistaken for other characters and are therefore confusing.
    var flag = false;
    if ((password.indexOf("i") != -1) ||  (password.indexOf("o") != -1) || (password.indexOf("l") != -1)){
      flag = true;
    }

  return flag;
}

function containsPairs(password) {
  for (var i = 1; i < password.length; i++) {
    if (password[i] == password[i - 1]) {
      var rest = password.substring(i + 1);
      for (var j = 1; j < rest.length; j++) {
        if (rest[j] == rest[j - 1]) {
          return true;
        }
      }
    }
  }
  return false;
}


console.log(findPassword(input));

//console.log(incrementPassword(input));
//console.log(containsStraight("abcslaksd"));
//console.log(containsBadLetters("abcdefg"));
//console.log(containsPairs("aaabhfcdefg"));

//var pass = ["h","e","p","x","c","r","r","q"];
//pass[7] = alphabet[18];
//console.log(pass);
