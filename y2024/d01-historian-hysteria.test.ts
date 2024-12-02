import { describe, expect, it } from "vitest";
import { partOne, partTwo } from "./d01-historian-hysteria";
import { input } from "./inputs/d01";

describe("part one", () => {
	it("runs", () => {
		const example = [
			[3, 4],
			[4, 3],
			[2, 5],
			[1, 3],
			[3, 9],
			[3, 3],
		];
		expect(partOne(example)).toStrictEqual(11);
	});

	it("day one part one is correct", () => {
		expect(partOne(input)).toStrictEqual(1765812);
	});
});

describe("part two", () => {
	it("runs", () => {
		const example = [
			[3, 4],
			[4, 3],
			[2, 5],
			[1, 3],
			[3, 9],
			[3, 3],
		];
		expect(partTwo(example)).toStrictEqual(31);
	});

	it("day one part two is correct", () => {
		expect(partTwo(input)).toStrictEqual(20520794);
	});
});
