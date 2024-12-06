import { describe, expect, it } from "vitest";
import { parse, partOne, partTwo } from "./d05-print-queue";

const rules = {
	"47": ["53", "13", "61", "29"],
	"97": ["13", "61", "47", "29", "53", "75"],
	"75": ["29", "53", "47", "13", "61"],
	"61": ["13", "53", "29"],
	"29": ["13"],
	"53": ["29", "13"],
};
const updates = [
	["75", "47", "61", "53", "29"],
	["97", "61", "53", "29", "13"],
	["75", "29", "13"],
	["75", "97", "47", "61", "53"],
	["61", "13", "29"],
	["97", "13", "75", "29", "47"],
];

describe("part one", () => {
	it("runs", () => {
		expect(partOne(rules, updates)).toStrictEqual(143);
	});

	it("returns an answer for part one", () => {
		const { rules, updates } = parse();
		expect(partOne(rules, updates)).toStrictEqual(4924);
	});
});

describe("part two", () => {
	it("runs", () => {
		expect(partTwo(rules, updates)).toStrictEqual(123);
	});
	it("returns an answer for part two", () => {
		const { rules, updates } = parse();
		expect(partTwo(rules, updates)).toStrictEqual(6085);
	});
});
