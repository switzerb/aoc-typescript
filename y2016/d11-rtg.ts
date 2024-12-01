import { isEqual } from "lodash";

type State = number[];
type Step = {
	step: number;
	state: State;
};
type Dir = "up" | "down";

/*
 * [ 0,  1,  2,  3,  4  ] idx
 * [ me, HG, HM, LG, LM ] item
 * [ 1,  2,  1,  3,  1  ] floor
 *
 * state rules
 *
 * me = index 0
 * generators: odd indexes
 * chips: even indexes
 * chip always follows it's paired generator
 */
function parse(): State {
	// return [1, 2, 1, 3, 1];
	// The first floor contains a thulium generator, a thulium-compatible microchip, a plutonium generator, and a strontium generator.
	// 	The second floor contains a plutonium-compatible microchip and a strontium-compatible microchip.
	// 	The third floor contains a promethium generator, a promethium-compatible microchip, a ruthenium generator, and a ruthenium-compatible microchip.
	// 	The fourth floor contains nothing relevant.
	return [1, 1, 1, 1, 2, 1, 2, 3, 3, 3, 3];
}

// a microchip can't be on a floor without it's corresponding generator
const isFloorValid = (state: State, current: number) => {
	const [_, ...items] = state;
	const generators = [];
	const microchips = [];

	// if there are no generators
	// if there are no microchips
	// if every microchip has it's pair
	for (let idx = 0; idx <= items.length - 1; idx += 2) {
		// microchip / generator pair
		const generator = items[idx]; // what floor they are on
		const microchip = items[idx + 1];

		// generator on our current floor
		if (generator === current) {
			generators.push(generator);
		}
		// microchips on our current floor
		if (microchip === current) {
			microchips.push(microchip);
		}
	}
	if (generators.length === 0) return true;
	if (microchips.length === 0) return true;

	// there is a microchip without it's paired generator
	for (let idx = 0; idx <= items.length - 1; idx += 2) {
		const generator = items[idx]; // what floor they are on
		const microchip = items[idx + 1];

		if (microchip === current && generator !== current) {
			return false;
		}
	}
	return true;
};

export function isValidState(state: State) {
	// get pairs of chip to generator
	const floors = [1, 2, 3, 4];
	const validity = [];

	for (const floor of floors) {
		const isValid = isFloorValid(state, floor);
		validity.push(isValid);
	}
	return validity.every((floor) => floor === true);
}

export const getByFloor = (state: State, floor: number) =>
	state.reduce(
		(items, item, idx) => (item === floor ? items.concat(idx) : items),
		[] as number[],
	);

export const getMoveOptions = (items: number[]) => {
	const options = [];
	for (const [idx, item] of items.entries()) {
		options.push([item]);
		for (const rest of items.slice(idx + 1)) {
			options.push([item, rest]);
		}
	}
	return options;
};

const move = (dir: Dir, state: State, current: number, option: number[]) => {
	const next = [...state];
	next[0] = dir === "up" ? current + 1 : current - 1;
	for (const idx of option) {
		next[idx] = dir === "up" ? state[idx] + 1 : state[idx] - 1;
	}
	return next;
};

const getCurrentFloor = (state: State) => state[0];

/* List of all possible next moves given the current state */
export function getNeighbors(state: State): State[] {
	const neighbors = [];
	const current = getCurrentFloor(state);
	const [_, ...items] = getByFloor(state, current);
	const moveOptions = getMoveOptions(items);

	if (current === 1) {
		for (const option of moveOptions) {
			neighbors.push(move("up", state, current, option));
		}
	}
	if (current === 2 || current === 3) {
		for (const option of moveOptions) {
			neighbors.push(move("up", state, current, option));
			neighbors.push(move("down", state, current, option));
		}
	}
	if (current === 4) {
		for (const option of moveOptions) {
			neighbors.push(move("down", state, current, option));
		}
	}
	console.log(neighbors);
	return neighbors.filter((state) => isValidState(state));
}

export const atTop = (state: State): boolean =>
	state.every((item) => item === 4);

export function part_one() {
	const visited = [] as State[];
	const queue = [] as Step[]; // FIFO push & pop
	const start = [1, 1, 1, 1, 2, 1, 2, 3, 3, 3, 3];
	const step = 0;

	queue.push({ step, state: start });
	while (queue.length > 0) {
		const current = queue.shift();

		if (atTop(current.state)) {
			return current.step;
		}

		if (visited.find((state) => isEqual(state, current.state))) {
			continue;
		}

		const neighbors = getNeighbors(current.state);

		for (const neighbor of neighbors) {
			queue.push({ step: current.step + 1, state: neighbor });
		}

		visited.push(current.state);
	}

	throw new Error("we never reached the top");
}

// part_one();
