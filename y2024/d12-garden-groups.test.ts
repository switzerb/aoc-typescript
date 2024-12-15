import { describe, expect, it } from "vitest";
import {partOne, partTwo} from './d12-garden-groups';
import fs from 'node:fs';
import path from 'node:path';


const example = `
AAAA
BBCD
BBCC
EEEC
`;

const ex2 = `
RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE
`;

const ex3 = `
OOOOO
OXOXO
OOOOO
OXOXO
OOOOO
`;

const ex4 = `
EEEEE
EXXXX
EEEEE
EXXXX
EEEEE
`;

const ex5 = `
AAAAAA
AAABBA
AAABBA
ABBAAA
ABBAAA
AAAAAA
`;

const file = fs.readFileSync(
    path.resolve(__dirname, './inputs/d12.txt'),
    "utf8",
);

describe("part one", () => {
    it("runs", () => {
        expect(partOne(example)).toStrictEqual(140);
        expect(partOne(ex2)).toStrictEqual(1930);
        expect(partOne(file)).toStrictEqual(1381056);
    });
});

describe("part two", () => {
    it("runs", () => {
        expect(partTwo(example)).toStrictEqual(80);
        expect(partTwo(ex2)).toStrictEqual(1206);
        expect(partTwo(ex3)).toStrictEqual(436);
        expect(partTwo(ex5)).toStrictEqual(368);
        expect(partTwo(ex4)).toStrictEqual(236);
        expect(partTwo(file)).toStrictEqual(834828);
    })
})