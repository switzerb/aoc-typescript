import fs from "node:fs";
import { describe, expect, it } from "vitest";
import { partOne, partTwo } from "./d09-disk-fragmenter";
import path from 'node:path';

const example = "2333133121414131402";

const file = fs.readFileSync(
	path.resolve(__dirname, './inputs/d09.txt'),
	"utf8",
);

describe("part one", () => {
	it("runs", () => {
		expect(partOne(example)).toStrictEqual(1928);
	});

	it("returns an answer for part one", () => {
		expect(partOne(file)).toStrictEqual(6435922584968);
	});
});

describe("part two", () => {
	it("runs", () => {
		expect(partTwo(example)).toStrictEqual(2858);
	});

	it("returns an answer for part two", () => {
		expect(partTwo(file)).toStrictEqual(6469636832766);
	});
});
