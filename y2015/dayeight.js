var input = document.getElementById("input").innerHTML;
//var input = document.getElementById("test").innerHTML;
var list = input.split("\n");
var literal_sum = 0, memory_sum = 0, new_literal_sum = 0;

for (var i = 0; i < list.length;i++){
  var item = list[i].trim();
  item = item.substr(1,item.length-2);
  console.log(item);

  var string_literal = item.length + 2;
  var backslash_num = (occurrences(item,"\\\\"));
  var quote_num = (occurrences(item,"\\\""));
  var hex_num = ((occurrences(item,"\\x")) * 3);
  var hex_count = (occurrences(item,"\\x"));
  var in_memory = item.length - hex_num - backslash_num - quote_num;

  var new_literal = 4 + (2 * quote_num) + hex_count + (2 * backslash_num) + string_literal;
  literal_sum = literal_sum + string_literal;
  memory_sum = memory_sum + in_memory;
  new_literal_sum = new_literal_sum + new_literal;

  console.log("hex count:", hex_count);
  console.log("quote: ", quote_num);
  console.log("backslash: ", backslash_num);
  console.log("literal: ", string_literal);
  console.log("new literal: ", new_literal);
  console.log("memory: ", in_memory);
}

function occurrences(string, subString) {

  string += "";
  subString += "";
  if (subString.length <= 0) return (string.length + 1);

  var n = 0,
    pos = 0,
    step = subString.length;

  while (true) {
    pos = string.indexOf(subString, pos);
    if (pos >= 0) {
      ++n;
      pos += step;
    } else break;
  }
  return n;
}

var answer = literal_sum - memory_sum;
var second_answer = new_literal_sum - literal_sum;
console.log(new_literal_sum);
console.log(literal_sum);
console.log(memory_sum);
console.log("answer: ", answer);
console.log("second answer", second_answer);
//1385
//1380
//1371

//2742
//2117
