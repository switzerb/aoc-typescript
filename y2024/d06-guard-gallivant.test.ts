import { describe, expect, it } from "vitest";
import { parse, partOne, partTwo } from "./d06-guard-gallivant";

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

describe("part one", () => {
	it("runs", () => {
		const { grid, start } = parse(example);
		expect(partOne(grid, start)).toStrictEqual(41);
	});
	it("returns an answer for part one", () => {
		const { grid, start } = parse();
		expect(partOne(grid, start)).toStrictEqual(4789);
	});
});

describe("part two", () => {
	it("runs", () => {
		const { grid, start } = parse(example);
		expect(partTwo(grid, start)).toStrictEqual(6);
	});

	it("returns an answer for part two", () => {
		const { grid, start } = parse();
		expect(partTwo(grid, start)).toStrictEqual(0);
	});
});
