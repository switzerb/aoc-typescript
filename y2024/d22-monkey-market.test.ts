import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { partOne, partTwo } from "./d22-monkey-market";

const example = `
1
10
100
2024
`;

const ex2 = `
1
2
3
2024
`;

// 8685429
// 4700978
// 15273692
// 8667524

const file = fs.readFileSync(
	path.resolve(__dirname, "./inputs/d22.txt"),
	"utf8",
);

describe("part one", () => {
	it("runs", () => {
		expect(partOne(example)).toStrictEqual(37327623);
		expect(partOne(file)).toStrictEqual(14180628689);
	});
});

describe("part two", () => {
	it("runs", () => {
		expect(partTwo(ex2)).toStrictEqual(23);
		expect(partTwo(file)).toStrictEqual(1690);
	});
});
