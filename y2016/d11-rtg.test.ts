import { describe, expect, it } from "vitest";
import {
	atTop,
	getByFloor,
	getMoveOptions,
	getNeighbors,
	isValidState,
	part_one,
} from "./d11-rtg";

describe("part one", () => {
	it("runs", () => {
		const state = [1, 2, 1, 3, 1];
		expect(part_one()).toStrictEqual(11);
	});

	it("get items by floor", () => {
		const state = [1, 2, 1, 3, 1];
		expect([0, 2, 4]).toStrictEqual(getByFloor(state, 1));
	});

	it("gets the list of things that can move", () => {
		const items = [2, 4];
		expect([[2], [2, 4], [4]]).toStrictEqual(getMoveOptions(items));
	});

	it("gets neighbors", () => {
		const state = [1, 2, 1, 3, 1];
		expect([[2, 2, 2, 3, 1]]).toStrictEqual(getNeighbors(state));
	});

	it("gets neighbors 2", () => {
		const state = [3, 4, 3, 4, 3];
		const neighbors = [
			[4, 4, 4, 4, 3],
			[2, 4, 2, 4, 3],
			[4, 4, 4, 4, 4],
			[2, 4, 2, 4, 2],
			[4, 4, 3, 4, 4],
			[2, 4, 3, 4, 2],
		];
		expect(neighbors).toStrictEqual(getNeighbors(state));
	});

	it("gets neighbors 3", () => {
		const state = [3, 3, 3, 3, 1];
		const neighbors = [
			[4, 4, 4, 3, 1],
			[2, 2, 2, 3, 1],
			[4, 4, 3, 4, 1],
			[2, 2, 3, 2, 1],
			[4, 3, 4, 3, 1],
			[2, 3, 2, 3, 1],
			[4, 3, 3, 4, 1],
			[2, 3, 3, 2, 1],
		];
		expect(neighbors).toStrictEqual(getNeighbors(state));
	});

	it("checks invalid state", () => {
		expect(isValidState([1, 2, 1, 3, 1])).toBe(true);
		expect(isValidState([1, 2, 1, 1, 1])).toBe(false);
		expect(isValidState([3, 4, 3, 3, 2])).toBe(false);
		expect(isValidState([4, 4, 3, 3, 1])).toBe(false);
		expect(isValidState([4, 4, 4, 4, 3])).toBe(true);
		expect(isValidState([2, 4, 2, 4, 3])).toBe(true);
		expect(isValidState([4, 4, 4, 4, 4])).toBe(true);
		expect(isValidState([2, 4, 2, 4, 2])).toBe(true);
		expect(isValidState([4, 4, 3, 4, 4])).toBe(true);
		expect(isValidState([4, 1, 3, 4, 1])).toBe(false);
	});

	it("filters invalid state", () => {
		const neighbors = [
			[4, 4, 4, 4, 3],
			[4, 4, 3, 4, 4],
			[4, 4, 4, 4, 4],
			[2, 4, 2, 4, 3],
			[2, 4, 2, 4, 2],
			[4, 4, 3, 3, 4],
		];
		const valid = [
			[4, 4, 4, 4, 3],
			[4, 4, 3, 4, 4],
			[4, 4, 4, 4, 4],
			[2, 4, 2, 4, 3],
			[2, 4, 2, 4, 2],
		];
		const filtered = neighbors.filter((state) => isValidState(state));
		expect(filtered).toStrictEqual(valid);
	});

	it("tells me I have succeeded", () => {
		expect(atTop([4, 4, 4, 4, 4])).toEqual(true);
	});
});
