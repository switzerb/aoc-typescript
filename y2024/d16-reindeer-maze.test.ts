import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { partOne } from "./d16-reindeer-maze";

const example = `
###############
#.......#....E#
#.#.###.#.###.#
#.....#.#...#.#
#.###.#####.#.#
#.#.#.......#.#
#.#.#####.###.#
#...........#.#
###.#.#####.#.#
#...#.....#.#.#
#.#.#.###.#.#.#
#.....#...#.#.#
#.###.#.#.#.#.#
#S..#.....#...#
###############`;

const another = `
#################
#...#...#...#..E#
#.#.#.#.#.#.#.#.#
#.#.#.#...#...#.#
#.#.#.#.###.#.#.#
#...#.#.#.....#.#
#.#.#.#.#.#####.#
#.#...#.#.#.....#
#.#.#####.#.###.#
#.#.#.......#...#
#.#.###.#####.###
#.#.#...#.....#.#
#.#.#.#####.###.#
#.#.#.........#.#
#.#.#.#########.#
#S#.............#
#################`;

const file = fs.readFileSync(
	path.resolve(__dirname, "./inputs/d16.txt"),
	"utf8",
);

describe("part one", () => {
	it("runs", () => {
		// expect(partOne(example)).toStrictEqual(7036);
		// expect(partOne(another)).toStrictEqual(11048);
		expect(partOne(file)).toStrictEqual(0); //too high 155528
	});
});
