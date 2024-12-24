import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { partOne, partTwo } from "./d23-lan-party";

const example = `
kh-tc
qp-kh
de-cg
ka-co
yn-aq
qp-ub
cg-tb
vc-aq
tb-ka
wh-tc
yn-cg
kh-ub
ta-co
de-co
tc-td
tb-wq
wh-td
ta-ka
td-qp
aq-cg
wq-ub
ub-vc
de-ta
wq-aq
wq-vc
wh-yn
ka-de
kh-ta
co-tc
wh-qp
tb-vc
td-yn`;

const file = fs.readFileSync(
	path.resolve(__dirname, "./inputs/d23.txt"),
	"utf8",
);

describe("part one", () => {
	it("runs", () => {
		expect(partOne(example)).toStrictEqual(7);
		expect(partOne(file)).toStrictEqual(1238);
	});
});

describe("part two", () => {
	it("runs", () => {
		expect(partTwo(example)).toStrictEqual("co,de,ka,ta");
		expect(partTwo(file)).toStrictEqual(
			"bg,bl,ch,fn,fv,gd,jn,kk,lk,pv,rr,tb,vw",
		);
	});
});
