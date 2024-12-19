import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { partOne, partTwo } from "./d18-ram-run";

const example = `
5,4
4,2
4,5
3,0
2,1
6,3
2,4
1,5
0,6
3,3
2,6
5,1
1,2
5,5
2,5
6,5
1,4
0,4
6,4
1,1
6,1
1,0
0,5
1,6
2,0`;

const file = fs.readFileSync(
	path.resolve(__dirname, "./inputs/d18.txt"),
	"utf8",
);

describe("part one", () => {
	it("runs", () => {
		expect(partOne(example, 12, 7)).toStrictEqual(22);
		expect(partOne(file, 1024, 71)).toStrictEqual(380);
	});
});

describe("part two", () => {
	it("runs", () => {
		expect(partTwo(example, 12, 7)).toStrictEqual("6,1");
		expect(partTwo(file, 1024, 71)).toStrictEqual("26,50");
	});
});
