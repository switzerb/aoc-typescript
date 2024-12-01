/*
Dancer can fly 27 km/s for 5 seconds, but then must rest for 132 seconds.
  Cupid can fly 22 km/s for 2 seconds, but then must rest for 41 seconds.
  Rudolph can fly 11 km/s for 5 seconds, but then must rest for 48 seconds.
  Donner can fly 28 km/s for 5 seconds, but then must rest for 134 seconds.
  Dasher can fly 4 km/s for 16 seconds, but then must rest for 55 seconds.
  Blitzen can fly 14 km/s for 3 seconds, but then must rest for 38 seconds.
  Prancer can fly 3 km/s for 21 seconds, but then must rest for 40 seconds.
  Comet can fly 18 km/s for 6 seconds, but then must rest for 103 seconds.
  Vixen can fly 18 km/s for 5 seconds, but then must rest for 84 seconds.
  */

var dancer =    {"title": "dancer", "speed": 27, "endurance": 5 , "rest": 132 , "flying":true , "count": 5 , "distance": 0 , "points": 0 };
var cupid =     {"title": "cupid",  "speed": 22, "endurance": 2 , "rest": 41  , "flying":true , "count": 2 , "distance": 0 , "points": 0 };
var rudolph =   {"title": "rudolph","speed": 11, "endurance": 5 , "rest": 48  , "flying":true , "count": 5 , "distance": 0 , "points": 0 };
var donner  =   {"title": "donner", "speed": 28, "endurance": 5 , "rest": 134 , "flying":true , "count": 5 , "distance": 0 , "points": 0 };
var dasher =    {"title": "dasher", "speed": 4, "endurance": 16 , "rest": 55  , "flying":true , "count": 16 , "distance":0 , "points": 0 };
var blitzen =   {"title": "blitzen","speed": 14, "endurance": 3 , "rest": 38  , "flying":true , "count": 3 , "distance": 0 , "points": 0 };
var prancer =   {"title": "prancer","speed": 3, "endurance": 21 , "rest": 40  , "flying":true , "count": 21 , "distance": 0, "points": 0 };
var comet  =    {"title": "comet",  "speed": 18, "endurance": 6 , "rest": 103 , "flying":true , "count": 6 , "distance": 0 , "points": 0 };
var vixen =     {"title": "vixen",  "speed": 18, "endurance": 5 , "rest": 84  , "flying":true , "count": 5 , "distance": 0 , "points": 0 };

var reindeer = [dancer,cupid,rudolph,donner,dasher,blitzen,prancer,comet,vixen];

//var reindeer = [{"title": "comet","speed": 14, "endurance": 10 , "rest": 127, "flying": true, "count": 10,"distance": 0, "points": 0 },{"title": "dancer","speed": 16, "endurance": 11 , "rest": 162, "flying": true, "count": 11,"distance": 0, "points": 0 }]

console.log(reindeer);

Array.max = function( array ){
  return Math.max.apply( Math, array );
};

//count each second of the race up to 2503 seconds
for(var i = 1; i <= 2503; i++) {

  for (var j = 0; j < reindeer.length; j++) {

      if(reindeer[j].count == 0 && reindeer[j].flying == true ) {
        reindeer[j].count = reindeer[j].rest;
        reindeer[j].flying = false;
      } else if (reindeer[j].count == 0 && reindeer[j].flying == false) {
        reindeer[j].count = reindeer[j].endurance;
        reindeer[j].flying = true;
      }

      if(reindeer[j].flying == true) {
        reindeer[j].distance = reindeer[j].distance + reindeer[j].speed;
      }

      reindeer[j].count--;

//      console.log(reindeer[j].title, " second ", i, reindeer[j].count, reindeer[j].flying);
  }

  var leader = Math.max(reindeer[0].distance,reindeer[1].distance,reindeer[2].distance,reindeer[3].distance,reindeer[4].distance,reindeer[5].distance,reindeer[6].distance,reindeer[7].distance,reindeer[8].distance);

  for (var j = 0; j < reindeer.length; j++) {
    if (leader == reindeer[j].distance) {
      reindeer[j].points++;
     }
  }

}


console.log(reindeer[0].points);
console.log(reindeer[1].points);
console.log(reindeer[2].points);
console.log(reindeer[3].points);
console.log(reindeer[4].points);
console.log(reindeer[5].points);
console.log(reindeer[6].points);
console.log(reindeer[7].points);
console.log(reindeer[8].points);

//console.log(reindeer[2].distance);
//console.log(reindeer[3].distance);
//console.log(reindeer[4].distance);
//console.log(reindeer[5].distance);
//console.log(reindeer[6].distance);
//console.log(reindeer[7].distance);
//console.log(reindeer[8].distance);
