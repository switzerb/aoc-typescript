import fs from "node:fs";
import { describe, expect, it } from "vitest";
import {
	getAntiNodes,
	getMoarAntiNodes,
	partOne,
	partTwo,
} from "./d08-resonant-collinearity";
import path from 'node:path';

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
	path.resolve(__dirname, './inputs/d08.txt'),
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
	it("runs", () => {
		expect(partTwo(example)).toStrictEqual(34);
	});

	it("returns an answer for part two", () => {
		expect(partTwo(file)).toStrictEqual(1333);
	});
});
