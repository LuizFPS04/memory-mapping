import { exponent } from "../utils/cacheUtils";

export function blockSize(cacheWords: number): number {
    return cacheWords * 4;
}

export function blockBits(cacheWords: number): number {
    return exponent(blockSize(cacheWords));
}

export function tagBits(index: number, cacheSize: number, cacheWords: number): number {    
    return exponent(cacheSize) - (index + blockBits(cacheWords));
}

export function groupBits(cacheLines: number, cacheGroup: number): number {
    return exponent(cacheLines / cacheGroup);
}

export function accessBlocks(block: number, blocks: number[], hit: number, miss: number): { hit: number, miss: number } {
    if (blocks.indexOf(block) != -1) {
        hit += 1;
    } else {
        blocks.push(block);
        miss += 1;
    }
    return { hit, miss };
}