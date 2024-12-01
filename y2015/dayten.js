
/*
1 becomes 11 (1 copy of digit 1).
11 becomes 21 (2 copies of digit 1).
21 becomes 1211 (one 2 followed by one 1).
1211 becomes 111221 (one 1, one 2, and two 1s).
111221 becomes 312211 (three 1s, two 2s, and one 1).
*/

/*
1 -> 11;
11 -> 21;
21 -> 1211;
1211 -> 111221;
111221 -> 312211;
*/

function lookAndSay(seq){
  var prev = seq[0];
  //debugger
  var freq = 0;
  var output = [];

  seq.forEach(function(s){
    if ( s == prev){
      freq++;
    }
    else{
      output.push(freq);
      output.push(prev);
      prev = s;
      freq = 1;
    }
  });
  output.push(freq);
  output.push(prev);
  return output;
}

// Sample: try on the first 11 sequences
var seq = [3,1,1,3,3,2,2,1,1,3];

for (var n = 0; n < 50; n++){
  seq = lookAndSay(seq);
  console.log(n);
  console.log(seq.length);
}

//446898
