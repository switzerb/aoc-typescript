import { describe, expect, it } from "vitest";
import { type Robot, partOne, partTwo } from "./d14-restroom-redoubt";
import { input } from "./inputs/d14";

const example: Robot[] = [
	{ p: [0, 4], v: [3, -3] },
	{ p: [6, 3], v: [-1, -3] },
	{ p: [10, 3], v: [-1, 2] },
	{ p: [2, 0], v: [2, -1] },
	{ p: [0, 0], v: [1, 3] },
	{ p: [3, 0], v: [-2, -2] },
	{ p: [7, 6], v: [-1, -3] },
	{ p: [3, 0], v: [-1, -2] },
	{ p: [9, 3], v: [2, 3] },
	{ p: [7, 3], v: [-1, 2] },
	{ p: [2, 4], v: [2, -3] },
	{ p: [9, 5], v: [-3, -3] },
];

describe("part one", () => {
	it("runs", () => {
		expect(partOne(example, 7, 11)).toStrictEqual(12);
		expect(partOne(input, 103, 101)).toStrictEqual(233709840); // 223217940
	});
});

describe("part two tree", () => {
	it("runs", () => {
		expect(partTwo(input, 103, 101)).toStrictEqual(0);
	});
});
