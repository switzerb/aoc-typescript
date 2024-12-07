import { describe, expect, it } from "vitest";
import { evaluate, parse, partOne, partTwo } from "./d07-bridge-repair";

const example = [
	[190, 10, 19],
	[3267, 81, 40, 27],
	[83, 17, 5],
	[156, 15, 6],
	[7290, 6, 8, 6, 15],
	[161011, 16, 10, 13],
	[192, 17, 8, 14],
	[21037, 9, 7, 18, 13],
	[292, 11, 6, 16, 20],
];

describe("part one", () => {
	it("evaluates", () => {
		expect(evaluate(190, [10, 19])).toBe(true);
		expect(evaluate(292, [11, 6, 16, 20])).toBe(true);
		expect(evaluate(161011, [16, 10, 13])).toBe(false);
	});

	it("runs", () => {
		expect(partOne(example)).toStrictEqual(3749);
	});

	it("returns an answer for part one", () => {
		const input = parse();
		expect(partOne(input)).toStrictEqual(7885693428401);
	});
});

describe("part two", () => {
	it("runs", () => {
		expect(partTwo(example)).toStrictEqual(11387);
	});

	it("returns an answer for part two", () => {
		const input = parse();
		expect(partTwo(input)).toStrictEqual(348360680516005);
	});
});
