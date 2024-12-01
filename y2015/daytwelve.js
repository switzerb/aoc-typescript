
//takeaway: package scope

function parseAndTraverse(input) {
  return traverse(JSON.parse(input));
}

function traverse(input) {
  var sum = 0;

  if (input instanceof Array) {
    for (var i = 0; i < input.length; i++) {
        sum += traverse(input[i]);
      }

   } else if (input instanceof Object) {

    var flag = false;
    for(var property in input) {
      if (input[property] == "red") {
        flag = true;
      }
    }

     if(flag == false) {
      for(var item in input) {
          sum += traverse(input[item]);
      }
     }

  } else if (typeof input == "number") {
      sum = input
  }
  return sum;
}

console.log(4, parseAndTraverse('[1,{"c":"red","b":2},3]'));
console.log(0, parseAndTraverse('{"d":"red","e":[1,2,3,4],"f":5}'));
console.log(6, parseAndTraverse('[1,2,3]'));
console.log(6, parseAndTraverse('[1,"red",5]'));
console.log("?", parseAndTraverse(data));
