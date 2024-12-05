import { describe, expect, it } from "vitest";
import { parse, partOne, partTwo } from "./d04";

describe("part one", () => {
	it("runs", () => {
		const example = [
			["M", "M", "M", "S", "X", "X", "M", "A", "S", "M"],
			["M", "S", "A", "M", "X", "M", "S", "M", "S", "A"],
			["A", "M", "X", "S", "X", "M", "A", "A", "M", "M"],
			["M", "S", "A", "M", "A", "S", "M", "S", "M", "X"],
			["X", "M", "A", "S", "A", "M", "X", "A", "M", "M"],
			["X", "X", "A", "M", "M", "X", "X", "A", "M", "A"],
			["S", "M", "S", "M", "S", "A", "S", "X", "S", "S"],
			["S", "A", "X", "A", "M", "A", "S", "A", "A", "A"],
			["M", "A", "M", "M", "M", "X", "M", "M", "M", "M"],
			["M", "X", "M", "X", "A", "X", "M", "A", "S", "X"],
		];
		expect(partOne(example)).toStrictEqual(18);
	});

	it("returns correct answer for part one", () => {
		const input = parse();
		expect(partOne(input)).toStrictEqual(2534);
	});
});

describe("part two", () => {
	it("runs", () => {
		const example = [
			["M", "M", "M", "S", "X", "X", "M", "A", "S", "M"],
			["M", "S", "A", "M", "X", "M", "S", "M", "S", "A"],
			["A", "M", "X", "S", "X", "M", "A", "A", "M", "M"],
			["M", "S", "A", "M", "A", "S", "M", "S", "M", "X"],
			["X", "M", "A", "S", "A", "M", "X", "A", "M", "M"],
			["X", "X", "A", "M", "M", "X", "X", "A", "M", "A"],
			["S", "M", "S", "M", "S", "A", "S", "X", "S", "S"],
			["S", "A", "X", "A", "M", "A", "S", "A", "A", "A"],
			["M", "A", "M", "M", "M", "X", "M", "M", "M", "M"],
			["M", "X", "M", "X", "A", "X", "M", "A", "S", "X"],
		];
		expect(partTwo(example)).toStrictEqual(9);
	});

	it("returns correct answer for part two", () => {
		const input = parse();
		expect(partTwo(input)).toStrictEqual(1866);
	});
});
