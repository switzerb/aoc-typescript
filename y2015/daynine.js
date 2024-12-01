//var input = document.getElementById("input").innerHTML;
//var input = document.getElementById("test").innerHTML;
//var list = input.split("\n");


function parseList(s){
  return s.split(" ");
}

//for(var i = 0; i < list.length;i++) {
//  var item = list[i].trim();
//  console.log(parseList(item));
//}

/*
0 Faerun to Norrath           = 129
1 Faerun to Tristram          = 58
2 Faerun to AlphaCentauri     = 13
3 Faerun to Arbre             = 24
4 Faerun to Snowdin           = 60
5 Faerun to Tambi             = 71
6 Faerun to Straylight        = 67
7 Norrath to Tristram         = 142
8 Norrath to AlphaCentauri    = 15
9 Norrath to Arbre            = 135
10 Norrath to Snowdin          = 75
11 Norrath to Tambi            = 82
12 Norrath to Straylight       = 54
13 Tristram to AlphaCentauri   = 118
14 Tristram to Arbre           = 122
15 Tristram to Snowdin         = 103
16 Tristram to Tambi           = 49
17 Tristram to Straylight      = 97
18 AlphaCentauri to Arbre      = 116
19 AlphaCentauri to Snowdin    = 12
20 AlphaCentauri to Tambi      = 18
21 AlphaCentauri to Straylight = 91
22 Arbre to Snowdin            = 129
23 Arbre to Tambi              = 53
24 Arbre to Straylight         = 40
25 Snowdin to Tambi            = 15
26 Snowdin to Straylight       = 99
27 Tambi to Straylight         = 70
*/

/*
a Faerun
b Norrath
c Tristram
d AlphaCentauri
e Arbre
f Snowdin
g Tambi
h Straylight
*/

var lookup = {
  "ab": 129,
  "ac": 58,
  "ad": 13,
  "ae": 24,
  "af": 60,
  "ag": 71,
  "ah": 67,
  "ba": 129,
  "bc": 142,
  "bd": 15,
  "be": 135,
  "bf": 75,
  "bg": 82,
  "bh": 54,
  "ca": 58,
  "cb": 142,
  "cd": 118,
  "ce": 122,
  "cf": 103,
  "cg": 49,
  "ch": 97,
  "da": 13,
  "db": 15,
  "dc": 118,
  "de": 116,
  "df": 12,
  "dg": 18,
  "dh": 91,
  "ea": 24,
  "eb": 135,
  "ec": 122,
  "ed": 116,
  "ef": 129,
  "eg": 53,
  "eh": 40,
  "fa" : 60,
  "fb" : 75,
  "fc" : 103,
  "fd" : 12,
  "fe" : 129,
  "fg": 15,
  "fh": 99,
  "ga": 71,
  "gb": 82,
  "gc": 49,
  "gd": 18,
  "ge": 53,
  "gf": 15,
  "gh": 70,
  "ha": 67,
  "hb": 54,
  "hc": 97,
  "hd": 91,
  "he": 40,
  "hf": 99,
  "hg": 70
}

var input = ["a","b","c","d","e","f","g","h"];
var permArr = [],
  usedChars = [];

function permute(input) {
  for (var i = 0; i < input.length; i++) {

    var ch = input.splice(i, 1)[0];

    usedChars.push(ch);

    if (input.length == 0) {
      permArr.push(usedChars.slice());
    }

    permute(input);

    input.splice(i, 0, ch);

    usedChars.pop();
  }
  return permArr
};

function calculateDistance(input) {

  var distances = [];

  var permutations = permute(input);

  for (var i = 0; i < permutations.length;i++){
    var distance = sumDistance(permutations[i]);
    distances.push(distance);
  }
  return distances;
}

function sumDistance(p){

  var sum = 0;

  for (var i = 0, l = p.length -1; i < l; i++ ){
    var distance = p[i] + p[i+1];
    var value = lookup[distance];
    sum += value;
  }
  return sum;
}

var distances = calculateDistance(input);

Array.max = function( array ){
  return Math.max.apply( Math, array );
};
var maximum = Array.max(distances);

console.log(maximum);
console.log(distances);

//console.log(sumDistance(["a","b","c","d","e","f","g","h"]));
