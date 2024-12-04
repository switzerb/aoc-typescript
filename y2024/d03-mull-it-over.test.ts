import { describe, expect, it } from "vitest";
import { parse, partOne, partTwo } from "./d03-mull-it-over";

describe("part one", () => {
	it("runs", () => {
		const example =
			"xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))";
		expect(partOne(example)).toStrictEqual(161);
	});

	it("gets the right answer for part one", () => {
		const input = parse();
		expect(partOne(input)).toStrictEqual(168539636);
	});
});

describe("part two", () => {
	it("runs", () => {
		const example =
			"xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))";
		expect(partTwo(example)).toStrictEqual(48);
	});

	it("gets the right answer for part two", () => {
		const input = parse();
		expect(partTwo(input)).toStrictEqual(97529391);
	});
});
