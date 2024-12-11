import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { partOne, partTwo } from "./d10-hoof-it";

const simple = `
0123
1234
8765
9876
`;

const moar = `
8880888
8881888
8882888
6543456
7111117
8111118
9111119
`;

const again = `
8890119
8881598
8882557
6543456
7651987
8762222
9872222`;

const otra = `
1022922
2555855
3111711
4567654
1118113
1119552
5555501
`;

const example = `
89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732
`;

const file = fs.readFileSync(
	path.resolve(__dirname, './inputs/d10.txt'),
	"utf8",
);

describe("part one", () => {
	it("runs", () => {
		expect(partOne(simple)).toStrictEqual(1);
		expect(partOne(moar)).toStrictEqual(2);
		expect(partOne(again)).toStrictEqual(4);
		expect(partOne(otra)).toStrictEqual(3);
		expect(partOne(example)).toStrictEqual(36);
		expect(partOne(file)).toStrictEqual(744);
	});
});

describe("part two", () => {
	it("runs", () => {
		expect(partTwo(example)).toStrictEqual(81);
		expect(partTwo(file)).toStrictEqual(1651);
	});
});
