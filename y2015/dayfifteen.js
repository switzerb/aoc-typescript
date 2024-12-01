
/*
 Sprinkles: capacity 2, durability 0, flavor -2, texture 0, calories 3
 Butterscotch: capacity 0, durability 5, flavor -3, texture 0, calories 3
 Chocolate: capacity 0, durability 0, flavor 5, texture -1, calories 8
 Candy: capacity 0, durability -1, flavor 0, texture 5, calories 8
*/

/*
Butterscotch: capacity -1, durability -2, flavor 6, texture 3, calories 8
Cinnamon: capacity 2, durability 3, flavor -2, texture -1, calories 3*/

var ingredients = [
  {"capacity": 2 ,"durability": 0,"flavor": -2,"texture": 0,"calories":3},
  {"capacity": 0 ,"durability": 5,"flavor": -3,"texture": 0,"calories":3},
  {"capacity": 0 ,"durability": 0,"flavor": 5,"texture": -1,"calories":8},
  {"capacity": 0 ,"durability": -1,"flavor": 0,"texture": 5,"calories":8}
];

/*
var ingredients = [
  {"capacity": -1,"durability": -2,"flavor": 6,"texture": 3,"calories":8},
  {"capacity": 2,"durability": 3,"flavor": -2,"texture": -1,"calories":3}
];
*/

function calculateTotal(ingredients) {

  var max = 0;
  var remaining = 100;

  for (var i = 0; i <= 100; i++) {
    remaining = 100 - i;

    for (var j = 0; j <= 100; j++) {
      remaining = 100 - i - j;

      for (var k = 0; k <= 100; k++) {
        remaining = 100 - i - j - k;

            var cap = (i * ingredients[0].capacity) + (j * ingredients[1].capacity) + (k * ingredients[2].capacity) + (remaining * ingredients[3].capacity);
            var dur = (i * ingredients[0].durability) + (j * ingredients[1].durability) + (k * ingredients[2].durability) + (remaining * ingredients[3].durability);
            var flav = (i * ingredients[0].flavor) + (j * ingredients[1].flavor) + (k * ingredients[2].flavor) + (remaining * ingredients[3].flavor);
            var tex = (i * ingredients[0].texture) + (j * ingredients[1].texture) + (k * ingredients[2].texture) + (remaining * ingredients[3].texture);
            var cal = (i * ingredients[0].calories) + (j * ingredients[1].calories) + (k * ingredients[2].calories) + (remaining * ingredients[3].calories);

            if( cal == 500) {
              if (cap < 0) {
                cap = 0;
              }
              if (dur < 0) {
                dur = 0;
              }
              if (flav < 0) {
                flav = 0;
              }
              if (tex < 0) {
                tex = 0;
              }
              var total = cap * dur * flav * tex;

              if (total > max) {
                max = total;
              }
            }
        }
      }
    }
  return max;
}

function calculateTotalTest(ingredients) {

  var max = 0;
  var remaining = 100;

  for (var i = 0; i <= 100; i++) {
    remaining = 100 - i;

        var cap = (i * ingredients[0].capacity) + (remaining * ingredients[1].capacity);
        var dur = (i * ingredients[0].durability) + (remaining * ingredients[1].durability);
        var flav = (i * ingredients[0].flavor) + (remaining * ingredients[1].flavor);
        var tex = (i * ingredients[0].texture) + (remaining * ingredients[1].texture);
        var cal =  (i * ingredients[0].calories) + (remaining * ingredients[1].calories);

        if (cal == 500 ) {
          if (cap < 0) {
            cap = 0;
          }
          if (dur < 0) {
            dur = 0;
          }
          if (flav < 0) {
            flav = 0;
          }
          if (tex < 0) {
            tex = 0;
          }
          var total = cap * dur * flav * tex;

          if (total > max) {
            max = total;
          }
        }
  }
  return max;
}

console.log(calculateTotal(ingredients));
//19458432

