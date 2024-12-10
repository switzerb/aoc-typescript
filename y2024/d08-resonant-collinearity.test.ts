import fs from "node:fs";
import { describe, expect, it } from "vitest";
import {
	getAntiNodes,
	getMoarAntiNodes,
	partOne,
	partTwo,
} from "./d08-resonant-collinearity";

const example = `
............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`;

const file = fs.readFileSync(
	"/Users/brennaswitzer/Source/aoc/aoc-typescript/y2024/inputs/d08.txt",
	"utf8",
);

describe("part one", () => {
	it("gets antinodes correctly", () => {
		expect(getAntiNodes([2, 1], [4, 2])).toStrictEqual([
			[0, 0],
			[6, 3],
		]);
		expect(getAntiNodes([3, 4], [5, 5])).toStrictEqual([
			[1, 3],
			[7, 6],
		]);
	});

	it("runs", () => {
		expect(partOne(example)).toStrictEqual(14);
	});

	it("returns an answer for part one", () => {
		expect(partOne(file)).toStrictEqual(398);
	});
});

describe("part two", () => {
	it("gets antinodes correctly", () => {
		expect(getMoarAntiNodes([0, 0], [2, 1], 10, 10)).toStrictEqual([
			[4, 2],
			[6, 3],
			[8, 4],
		]);
	});

	it("runs", () => {
		expect(partTwo(example)).toStrictEqual(34);
	});

	it("returns an answer for part two", () => {
		expect(partTwo(file)).toStrictEqual(1333);
	});
});
