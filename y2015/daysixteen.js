var input = document.getElementById("input").innerHTML;
//var input = document.getElementById("test").innerHTML;
var list = input.split("\n");

function parse(list) {

  var sues = [];
  for (var i = 0; i < list.length;i++) {

    var temp = {};
    var item = list[i].trim();
    var intel = item.split(" ");

    temp.sue = i+1;
    var first = intel[2].substring(0,intel[2].length - 1);
    var second = intel[4].substring(0,intel[4].length - 1);
    var third = intel[6].substring(0,intel[6].length - 1);

    temp[first] = parseInt(intel[3].substring(0,intel[3].length - 1));
    temp[second] = parseInt(intel[5].substring(0,intel[5].length - 1));
    temp[third] = parseInt(intel[7]);
    sues.push(temp);
  }

  return sues;

}

function filterChildren(intel) {

  var filter = [];
  for (var i = 0; i < intel.length; i++) {

    if (intel[i].hasOwnProperty("children")) {
      if (intel[i]["children"] == 3) {
        filter.push(intel[i]);
      }
    } else {
      filter.push(intel[i]);
    }

  }
  return filter;

}

function filterCats(intel) {

  var filter = [];
  for (var i = 0; i < intel.length; i++) {

    if (intel[i].hasOwnProperty("cats")) {
      if (intel[i]["cats"] > 7) {
        filter.push(intel[i]);
      }
    } else {
      filter.push(intel[i]);
    }

  }
  return filter;

}

function filterSamoyeds(intel) {

  var filter = [];
  for (var i = 0; i < intel.length; i++) {

    if (intel[i].hasOwnProperty("samoyeds")) {
      if (intel[i]["samoyeds"] == 2) {
        filter.push(intel[i]);
      }
    } else {
      filter.push(intel[i]);
    }

  }
  return filter;

}

function filterPomeranians(intel) {

  var filter = [];
  for (var i = 0; i < intel.length; i++) {

    if (intel[i].hasOwnProperty("pomeranians")) {
      if (intel[i]["pomeranians"] < 3) {
        filter.push(intel[i]);
      }
    } else {
      filter.push(intel[i]);
    }

  }
  return filter;

}

function filterAkitas(intel) {

  var filter = [];
  for (var i = 0; i < intel.length; i++) {

    if (intel[i].hasOwnProperty("akitas")) {
      if (intel[i]["akitas"] == 0) {
        filter.push(intel[i]);
      }
    } else {
      filter.push(intel[i]);
    }

  }
  return filter;

}

function filterVizslas(intel) {

  var filter = [];
  for (var i = 0; i < intel.length; i++) {

    if (intel[i].hasOwnProperty("vizslas")) {
      if (intel[i]["vizslas"] == 0) {
        filter.push(intel[i]);
      }
    } else {
      filter.push(intel[i]);
    }

  }
  return filter;

}

function filterGoldfish(intel) {

  var filter = [];
  for (var i = 0; i < intel.length; i++) {

    if (intel[i].hasOwnProperty("goldfish")) {
      if (intel[i]["goldfish"] < 5) {
        filter.push(intel[i]);
      }
    } else {
      filter.push(intel[i]);
    }

  }
  return filter;

}
function filterTrees(intel) {

  var filter = [];
  for (var i = 0; i < intel.length; i++) {

    if (intel[i].hasOwnProperty("trees")) {
      if (intel[i]["trees"] > 3) {
        filter.push(intel[i]);
      }
    } else {
      filter.push(intel[i]);
    }

  }
  return filter;

}
function filterCars(intel) {

  var filter = [];
  for (var i = 0; i < intel.length; i++) {

    if (intel[i].hasOwnProperty("cars")) {
      if (intel[i]["cars"] == 2) {
        filter.push(intel[i]);
      }
    } else {
      filter.push(intel[i]);
    }

  }
  return filter;

}
function filterPerfumes(intel) {

  var filter = [];
  for (var i = 0; i < intel.length; i++) {

    if (intel[i].hasOwnProperty("perfumes")) {
      if (intel[i]["perfumes"] == 1) {
        filter.push(intel[i]);
      }
    } else {
      filter.push(intel[i]);
    }

  }
  return filter;

}
//children: 3
//cats: 7
//samoyeds: 2
//pomeranians: 3
//akitas: 0
//vizslas: 0
//goldfish: 5
//trees: 3
//cars: 2
//perfumes: 1

function findSue(list) {

  var sues = parse(list);

  var result = filterChildren(sues);

  result = filterCats(result);
  result = filterSamoyeds(result);
  result = filterPomeranians(result);
  result = filterAkitas(result);
  result = filterVizslas(result);
  result = filterGoldfish(result);
  result = filterTrees(result);
  result = filterCars(result);
  result = filterPerfumes(result);

  return result;
}

console.log(findSue(list));
