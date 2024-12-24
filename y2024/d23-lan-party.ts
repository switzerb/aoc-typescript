export function partOne(input: string) {
	const graph = parse(input);
	const triads = new Set<string>();

	for (const [node, _] of graph) {
		for (const first of graph.get(node)) {
			for (const second of graph.get(first)) {
				if (second !== node) {
					for (const third of graph.get(second)) {
						if (third === node) {
							const tri = [first, second, third].sort().join();
							if (!triads.has(tri)) {
								triads.add(tri);
							}
						}
					}
				}
			}
		}
	}

	return Array.from(triads).filter((triad) => {
		const [first, second, third] = triad.split(",");
		return first[0] === "t" || second[0] === "t" || third[0] === "t";
	}).length;
}

function bronKerbosch(graph) {
	const maximalCliques = [];

	function findCliques(R, P, X) {
		if (P.length === 0 && X.length === 0) {
			maximalCliques.push(R);
			return;
		}

		for (const v of P) {
			const newR = [...R, v];
			const newP = P.filter((u) => graph.get(v).includes(u));
			const newX = X.filter((u) => graph.get(v).includes(u));
			findCliques(newR, newP, newX);
			P.splice(P.indexOf(v), 1);
			X.push(v);
		}
	}

	findCliques([], Array.from(graph.keys()), []);
	return maximalCliques;
}

export function partTwo(input: string) {
	const graph = parse(input);
	const cliques = bronKerbosch(graph);

	return cliques
		.reduce((acc, clique) => (clique.length > acc.length ? clique : acc), [])
		.toSorted()
		.join();
}

const parse = (input: string) => {
	const graph = new Map<string, string[]>();
	const network = input
		.trim()
		.split("\n")
		.map((line) => line.split("-"));

	for (const pair of network) {
		const [left, right] = pair;
		if (!graph.has(left)) graph.set(left, []);
		if (!graph.has(right)) graph.set(right, []);

		graph.get(left).push(right);
		graph.get(right).push(left);
	}
	return graph;
};
