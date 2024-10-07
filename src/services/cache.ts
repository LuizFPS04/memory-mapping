import { TCache } from '../types/cacheType';
import { exponent } from '../utils/cacheUtils';
import { blockSize, blockBits, groupBits, tagBits, accessBlocks } from './blockUtils';

export function mappingCache(cacheObj: TCache): number[] {
    const { 
        size: cacheSize, 
        words: cacheWords, 
        lines: cacheLines, 
        routes: cacheGroup, 
        address: cacheAddress 
    } = cacheObj;

    console.log(`RAM size: ${cacheSize}`);
    console.log(`Words in line: ${cacheWords}`);
    console.log(`Number of lines: ${cacheLines}`);
    console.log(`Number of routes (lines in group): ${cacheGroup}`);
    console.log(`Address: ${cacheAddress.join(" | ")}`);

    if (cacheGroup == 1) {
        return directMapping(cacheAddress, cacheSize, cacheLines, cacheWords, cacheGroup);
    } else if (cacheGroup == cacheLines) {
        return associativeMapping(cacheAddress, cacheSize, cacheLines, cacheWords, cacheGroup);
    } else if (cacheGroup != cacheLines && cacheGroup != 1) {
        return associativeGroupMapping(cacheAddress, cacheSize, cacheLines, cacheWords, cacheGroup);
    } else {
        return [];
    }
}

function directMapping(addressCache: number[], cacheSize: number, cacheLines: number, cacheWords: number, cacheGroup: number): number[] {
    let result: number[] = [];
    let blocks: number[] = [];
    let hit = 0, miss = 0;

    const bitsBlock: number = blockBits(cacheWords);
    const bitsGroup: number = groupBits(cacheLines, cacheGroup);
    let linesExponent: number = exponent(cacheLines);
    linesExponent = tagBits(linesExponent, cacheSize, cacheWords);

    console.log(`Line 1 (Block): ${bitsBlock}`);
    console.log(`Line 2 (Group): ${bitsGroup}`);
    console.log(`Line 3 (Lines): ${linesExponent}`);
    
    for (let index of addressCache) {
        let block = Math.floor(index / blockSize(cacheWords));
        ({ hit, miss } = accessBlocks(block, blocks, hit, miss));
    }

    console.log(`Line 4 (Cache Miss): ${miss}`);
    console.log(`Line 5 (Cache Hit): ${hit}`);

    result.push(
        bitsBlock,
        bitsGroup,
        linesExponent,
        miss,
        hit
    )

    return result;
}

function associativeMapping(addressCache: number[], cacheSize: number, cacheLines: number, cacheWords: number, cacheGroup: number): number[] {
    let result: number[] = [];
    let blocks: number[] = [];
    let hit = 0, miss = 0;

    const bitsBlock: number = blockBits(cacheWords);
    const bitsGroup: number = groupBits(cacheLines, cacheGroup);
    const linesExponent: number = tagBits(0, cacheSize, cacheWords);
    
    console.log(`Line 1 (Block): ${bitsBlock}`);
    console.log(`Line 2 (Group): ${bitsGroup}`);
    console.log(`Line 3 (Lines): ${linesExponent}`);

    for (let index of addressCache) {
        let block = Math.floor(index / blockSize(cacheWords));
        ({ hit, miss } = accessBlocks(block, blocks, hit, miss));
    }

    console.log(`Line 4 (Cache Miss): ${miss}`);
    console.log(`Line 5 (Cache Hit): ${hit}`);

    result.push(
        bitsBlock,
        bitsGroup,
        linesExponent,
        miss,
        hit
    )

    return result;
}

function associativeGroupMapping(addressCache: number[], cacheSize: number, cacheLines: number, cacheWords: number, cacheGroup: number): number[] {
    let result: number[] = [];
    let blocks: number[] = [];
    let hit = 0, miss = 0;

    const bitsBlock: number = blockBits(cacheWords);
    const bitsGroup: number = groupBits(cacheLines, cacheGroup);
    let linesExponent: number = exponent(bitsGroup);
    linesExponent = tagBits(linesExponent, cacheSize, cacheWords);
    
    console.log(`Line 1 (Block): ${bitsBlock}`);
    console.log(`Line 2 (Group): ${bitsGroup}`);
    console.log(`Line 3 (Lines): ${linesExponent}`);

    for (let index of addressCache) {
        let block = Math.floor(index / blockSize(cacheWords));
        ({ hit, miss } = accessBlocks(block, blocks, hit, miss));
    }

    console.log(`Line 4 (Cache Miss): ${miss}`);
    console.log(`Line 5 (Cache Hit): ${hit}`);

    result.push(
        bitsBlock,
        bitsGroup,
        linesExponent,
        miss,
        hit
    )

    return result;
}

