import { describe, expect, it } from "vitest";
import { partOne, partTwo } from "./d11-plutonian-pebbles"

const ex2 = "125 17";
const input = "28 4 3179 96938 0 6617406 490 816207";

describe("part one", () => {
    it("runs", () => {
        expect(partOne(ex2, 1)).toStrictEqual(3);
        expect(partOne(ex2, 2)).toStrictEqual(4);
        expect(partOne(ex2, 6)).toStrictEqual(22);
        expect(partOne(ex2, 25)).toStrictEqual(55312);
        expect(partOne(input, 25)).toStrictEqual(189167);
    })
});

describe("part two", () => {
    it("runs", () => {
        // expect(partTwo(ex2, 1)).toStrictEqual(3);
        expect(partTwo(ex2, 2)).toStrictEqual(4);
        // expect(partTwo(ex2, 6)).toStrictEqual(22);
        // expect(partTwo(ex2, 25)).toStrictEqual(55312);
        // expect(partTwo(input, 75)).toStrictEqual(0);

    })
})