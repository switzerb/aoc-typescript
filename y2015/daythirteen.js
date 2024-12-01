
var permArr = [],usedChars = [];

function getInstructions(input) {

  var list = input.split("\n");
  var map = {};

  for(var i = 0; i < list.length;i++) {
    var item = list[i].trim();
    var rules = item.split(" ");

    for(var j = 0; j < rules.length;j++){
      var people = rules[0] + rules[10];

      if(rules[2] == "lose"){
        var happy = -(rules[3]);
      } else {
        var happy = parseInt(rules[3]);
      }
      map[people] = happy;
    }
  }

  return map;
}

function consolidateMap(map,people) {
    for (var i = 0; i < people.length; i++ ){
      for (var j = i + 1; j < people.length; j++ ) {

        var combo = people[i] + people[j];
        var reverse = people[j] + people[i];

        var total = map[combo] + map[reverse];
        map[combo] = total;
        map[reverse] = total;
      }
    }
  return map;
}

// for each thing in that structure, find all the permutations of arrangements using all the people
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
  return permArr;
}

// add up all the numbers in that permutation
function calculateHappy(people,lookup){

  var sum = 0;

  var abc = people[0] + people[people.length-1];
  sum += lookup[abc];

   var smallest = lookup[abc];

  for (var i = 0, l = people.length -1; i < l; i++ ){
    //find the smallest negative sum here and remove it, which represents me blocking people who hate each other at the table
    var key = people[i] + people[i+1];

    if(lookup[key] < smallest) {
     smallest = lookup[key];
    }
    sum += lookup[key];
  }

  console.log(sum, Math.abs(smallest), sum + Math.abs(smallest));

  if(smallest > 0) {
    return sum - Math.abs(smallest);
  } else {
    return sum + Math.abs(smallest);
  }

  //return sum;
}

Array.max = function( array ){
  return Math.max.apply( Math, array );
};

function getHappy(input) {

  var combinations = [];

  var input = document.getElementById("input").innerHTML;
  var people = ["Alice","Bob","Carol","David","Eric","Frank","George","Mallory"];

  var list = getInstructions(input);
  var lookup = consolidateMap(list,people);

  var permutations = permute(people);

  for(var i = 0; i < permutations.length;i++){
    var total = calculateHappy(permutations[i],lookup);
    combinations.push(total);
  }
  console.log(combinations);

  return Array.max(combinations);
}

var input = document.getElementById("input").innerHTML;
var people = ["Alice","Bob","Carol","David","Eric","Frank","George","Mallory"];
var list = getInstructions(input);

console.log(calculateHappy(people,list));

console.log(getHappy());
