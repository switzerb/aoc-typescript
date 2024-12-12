
export function partOne(input: string, times: number) {
    let stones = input.trim().split(" ").map(n => Number(n));

    const blink = (state: number[]) => {
        return state.flatMap(stone => {
            const asString = String(stone);
            const len = asString.length;
            if(stone === 0) return 1
            if(len % 2 === 0) {
                return [Number(asString.substring(0,len / 2)), Number(asString.substring(len / 2))]
            }
            return stone * 2024;
        })
    }
    for(let i = 1; i <= times; i++) {
        stones = blink(stones);
    }

    return stones.length
}

export function partTwo(input: string, times: number)  {
    const stones = input.trim().split(" ").map(n => Number(n));
    let hist = new Map<number, number>();

    for(const stone of stones) {
        hist.set(stone, hist.has(stone) ? hist.get(stone) + 1 : 1);
    }

    for (let i = 1; i <= times; i++) {
        const next = new Map<number,number>();

        for (const [key,value] of hist.entries()) {
            const asString = String(key);
            const len = asString.length;

                if (key === 0) {
                    next.set(1, next.has(1) ? next.get(1) + value: value);
                } else if (len % 2 === 0) {
                    const left = Number(asString.substring(0, len / 2));
                    const right = Number(asString.substring(len / 2));
                    next.set(left, next.has(left) ? next.get(left) + value : value)
                    next.set(right, next.has(right) ? next.get(right) + value : value);
                } else {
                    const val = key * 2024;
                    next.set(val, next.has(val) ? next.get(val) + value : value)
                }

        }
        hist = next
    }

    return hist.values().reduce((a,n) => a + n);
}