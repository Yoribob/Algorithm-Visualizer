function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function generateArrayNumber(size: number, range: number, seed: number) {
  const rand = mulberry32(seed);
  const array = [];
  for (let i = 0; i < size; i++) {
    array.push(Math.floor(rand() * range));
  }
  return array;
}

