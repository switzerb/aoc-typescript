import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { partOne, partTwo } from "./d20-race-condition";
import { TimeUtils } from "./utils";

const example = `
###############
#...#...#.....#
#.#.#.#.#.###.#
#S#...#.#.#...#
#######.#.#.###
#######.#.#...#
#######.#.###.#
###..E#...#...#
###.#######.###
#...###...#...#
#.#####.#.###.#
#.#...#.#.#...#
#.#.#.#.#.#.###
#...#...#...###
###############
`;

const file = fs.readFileSync(
	path.resolve(__dirname, "./inputs/d20.txt"),
	"utf8",
);

describe("part one", () => {
	it("runs", () => {
		expect(TimeUtils.log(() => partOne(file))).toStrictEqual(1521); // path is 9372 long
	});
});

describe("part two", () => {
	it("runs", () => {
		expect(partTwo(file)).toStrictEqual(1013106);
	});
});
