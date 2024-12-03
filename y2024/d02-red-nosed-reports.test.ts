import { describe, expect, it } from "vitest";
import {
	buildAlternates,
	parse,
	partOne,
	partTwo,
} from "./d02-red-nosed-reports";

describe("part one", () => {
	it("runs", () => {
		const example = [
			[7, 6, 4, 2, 1],
			[1, 2, 7, 8, 9],
			[9, 7, 6, 2, 1],
			[1, 3, 2, 4, 5],
			[8, 6, 4, 4, 1],
			[1, 3, 6, 7, 9],
		];
		expect(partOne(example)).toStrictEqual(2);
	});

	it("returns an answer for part one", () => {
		const input = parse();
		expect(partOne(input)).toStrictEqual(334);
	});
});

describe("part two", () => {
	it("runs", () => {
		const example = [
			[7, 6, 4, 2, 1],
			[1, 2, 7, 8, 9],
			[9, 7, 6, 2, 1],
			[1, 3, 2, 4, 5],
			[8, 6, 4, 4, 1],
			[1, 3, 6, 7, 9],
		];
		expect(partTwo(example)).toStrictEqual(4);
	});

	it("returns an answer for part two", () => {
		const input = parse();
		expect(partTwo(input)).toStrictEqual(400);
	});
});
