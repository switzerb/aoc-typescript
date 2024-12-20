import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { partOne, partTwo } from "./d19-linen-layout";

const example = `
r, wr, b, g, bwu, rb, gb, br

brwrr
bggr
gbbr
rrbgbr
ubwu
bwurrg
brgr
bbrgwb
`;

const ex1 = `
r, wr, b, g, bwu, rb, gb, br

brwrr
`;

const ex2 = `
r, wr, b, g, bwu, rb, gb, br

gbbr
`;

const ex3 = `
r, wr, b, g, bwu, rb, gb, br

rrbgbr
`;

const file = fs.readFileSync(
	path.resolve(__dirname, "./inputs/d19.txt"),
	"utf8",
);

describe("part one", () => {
	it("runs", () => {
		expect(partOne(example)).toStrictEqual(6);
		expect(partOne(file)).toStrictEqual(324);
	});
});

describe("part two", () => {
	it("runs", () => {
		expect(partTwo(ex1)).toStrictEqual(2);
		expect(partTwo(ex2)).toStrictEqual(4);
		expect(partTwo(ex3)).toStrictEqual(6);
		expect(partTwo(example)).toStrictEqual(16);
		expect(partTwo(file)).toStrictEqual(0);
	});
});
