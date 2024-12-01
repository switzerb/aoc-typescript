
//return the count
// counting the dept of recursion using parameter to pass through


var containers = [33, 14, 18, 20, 45, 35, 16, 35, 1, 13, 18, 13, 50, 44, 48, 6, 24, 41, 30, 42];
var testContainers = [20, 15, 10, 5, 5];

function fillContainers(available,remaining, depth) {
  //debugger
  if (! depth) {
    depth = 0;
  }
  var count = 0;

  for (var i = 0; i < available.length; i++) {

    var container = available[i];

      if (container == remaining) {
        console.log("got one", depth);
        count++;
      } else if (container > remaining) {
          //I don't think we need to do anything else. uncertain
      } else if (container < remaining) {

        count += fillContainers(available.slice(i+1),remaining - container,depth+1);

      }

  }
  return count;
}

function add(used) {

  var sum = 0;

  for(var i = 0; i < used.length;i++){
    sum = used[i] + sum;
  }
  return sum;
}

function getCount(containers,target){

  var combinations = fillContainers(containers,target);

  return combinations;
}

//console.log(getCount(testContainers,25));
console.log(getCount(containers,150));
