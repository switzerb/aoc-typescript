import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { partOne, partTwo } from "./d16-reindeer-maze";
import { TimeUtils } from "./utils";

const simple = `
#######
#....E#
#.#.#.#
#S....#
#######
`;

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
		expect(partOne(simple)[0]).toStrictEqual(1006);
		expect(partOne(example)[0]).toStrictEqual(7036);
		expect(partOne(another)[0]).toStrictEqual(11048);
		expect(TimeUtils.log(() => partOne(file)[0])).toStrictEqual(147628); //too high 155528
	});
});

describe("part two", () => {
	it("runs", () => {
		expect(partTwo(example)).toStrictEqual(45);
		expect(partTwo(another)).toStrictEqual(64);
		expect(TimeUtils.log(() => partTwo(file))).toStrictEqual(670);
	});
});
