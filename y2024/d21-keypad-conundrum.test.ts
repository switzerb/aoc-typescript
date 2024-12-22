import { describe, expect, it } from "vitest";
import { partOne, partTwo, translate } from "./d21-keypad-conundrum";

const example = `
029A
980A
179A
456A
379A
`;

const input = `
671A
826A
670A
085A
283A
`;

describe("part one", () => {
	it("runs", () => {
		expect(Array.from(translate("029A", "numeric"))).toStrictEqual(
			expect.arrayContaining(Array.from("<A^A>^^AvvvA")),
		);
		expect(Array.from(translate("<A^A>^^AvvvA", "directional"))).toEqual(
			expect.arrayContaining(Array.from("v<<A>>^A<A>AvA<^AA>A<vAAA>^A")),
		);
		expect(
			Array.from(translate("v<<A>>^A<A>AvA<^AA>A<vAAA>^A", "directional")),
		).toEqual(
			expect.arrayContaining(
				Array.from(
					"<vA<AA>>^AvAA<^A>A<v<A>>^AvA^A<vA>^A<v<A>^A>AAvA^A<v<A>A>^AAAvA<^A>A",
				),
			),
		);
		expect(partOne("029A")).toStrictEqual(1972);
		expect(partOne(example)).toStrictEqual(126384);
		expect(partOne(input)).toStrictEqual(0); // 184316 - 177480
	});
});

describe("part two", () => {
	it("runs", () => {
		expect(partTwo()).toStrictEqual(0);
	});
});
