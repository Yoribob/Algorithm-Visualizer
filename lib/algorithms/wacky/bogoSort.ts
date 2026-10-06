import { CompareFn } from "@/lib/types/algorithm";

function shuffle(arr: number[]) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function isSorted(arr: number[], compareFn: CompareFn) {
  for (let i = 1; i < arr.length; i++) {

    if (compareFn(arr[i], arr[i - 1]) > 0) {
      return false;
    }
  }
  return true;
}

export function bogoSort(arr:number[]){

    let sorted = [...arr];
    sorted = shuffle(sorted);

    return sorted;
}