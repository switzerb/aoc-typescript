import { describe, expect, it } from "vitest";
import { partOne, partTwo } from "./d17-chronospacial-computer";

const ex1 = {
	A: 10,
	B: 0,
	C: 0,
	instr: [5, 0, 5, 1, 5, 4],
};

const ex2 = {
	A: 2024,
	B: 0,
	C: 0,
	instr: [0, 1, 5, 4, 3, 0],
};

const ex3 = {
	A: 729,
	B: 0,
	C: 0,
	instr: [0, 1, 5, 4, 3, 0],
};

const ex4 = {
	A: 117440,
	B: 0,
	C: 0,
	instr: [0, 3, 5, 4, 3, 0],
};

const input = {
	A: 56256477,
	B: 0,
	C: 0,
	instr: [2, 4, 1, 1, 7, 5, 1, 5, 0, 3, 4, 3, 5, 5, 3, 0],
};

describe("part one", () => {
	it("runs", () => {
		expect(partOne(ex1)).toStrictEqual("0,1,2");
		expect(partOne(ex2)).toStrictEqual("4,2,5,6,7,7,7,7,3,1,0");
		expect(partOne(ex3)).toStrictEqual("4,6,3,5,6,3,5,2,1,0");
		expect(partOne(input)).toStrictEqual("4,1,5,3,1,5,3,5,7");
	});
});

describe("part two", () => {
	it("runs", () => {
		expect(partOne(ex4)).toStrictEqual("0,3,5,4,3,0");
		expect(partTwo([0, 3, 5, 4, 3, 0])).toStrictEqual(117440);
		expect(
			partTwo([2, 4, 1, 1, 7, 5, 1, 5, 0, 3, 4, 3, 5, 5, 3, 0]),
		).toStrictEqual(164542125272765n);
	});
});
