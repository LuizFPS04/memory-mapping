import { TCache } from "../types/cacheType";

export function cacheInstructions(cacheData: string[]): TCache {
    
    const cacheDataLength: number = cacheData.length;

    let addressArr: any[] = cacheData[cacheDataLength - 1].split(/\s+/);
    addressArr = addressArr.map(address => parseInt(address));

    const cacheObj: TCache = {
        size: parseInt(cacheData[0]),
        words: parseInt(cacheData[1]),
        lines: parseInt(cacheData[2]),
        routes: parseInt(cacheData[3]),
        address: addressArr
    }

    return cacheObj;
}