import fs from "node:fs";
import { describe, expect, it } from "vitest";
import { partOne, partTwo } from "./d06-guard-gallivant";

const example =
	"....#.....\n" +
	".........#\n" +
	"..........\n" +
	"..#.......\n" +
	".......#..\n" +
	"..........\n" +
	".#..^.....\n" +
	"........#.\n" +
	"#.........\n" +
	"......#...";

const input = fs.readFileSync(
	"/Users/brennaswitzer/Source/aoc/aoc-typescript/y2024/inputs/d06.txt",
	"utf8",
);

describe("part one", () => {
	it("runs", () => {
		expect(partOne(example)).toStrictEqual(41);
	});
	it("returns an answer for part one", () => {
		expect(partOne(input)).toStrictEqual(4789);
	});
});

describe("part two", () => {
	it("runs", () => {
		expect(partTwo(example)).toStrictEqual(6);
	});

	it("returns an answer for part two", () => {
		expect(partTwo(input)).toStrictEqual(1304);
	});
});
