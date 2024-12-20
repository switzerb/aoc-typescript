function hasMatch(pattern: string, design: string, idx: number) {
	if (idx + pattern.length > design.length) return false;

	for (let i = 0; i < pattern.length; i++) {
		if (pattern[i] !== design[idx + i]) return false;
	}

	return true;
}

function possibleMatches(patterns: string[], design: string): number {
	const hist = Array(design.length + 2).fill(0);
	hist[0] = 1;
	for (let idx = 0; idx < design.length; idx++)
		if (hist[idx] > 0) {
			for (const pattern of patterns) {
				if (hasMatch(pattern, design, idx)) {
					hist[idx + pattern.length] += hist[idx];
				}
			}
		}

	return hist[design.length];
}

export function partOne(input: string) {
	const { patterns, designs } = parse(input);
	return designs.reduce((acc, design) => {
		return possibleMatches(patterns, design) ? acc + 1 : acc;
	}, 0);
}

export function partTwo(input: string) {
	const { patterns, designs } = parse(input);
	return designs.reduce(
		(acc, design) => acc + possibleMatches(patterns, design),
		0,
	);
}

export function parse(input: string) {
	const [patterns, designs] = input.split("\n\n");
	return {
		patterns: patterns.split(",").map((it) => it.trim()),
		designs: designs.trim().split("\n"),
	};
}
