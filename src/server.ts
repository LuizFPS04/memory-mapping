import * as path from 'path';

import { cacheInstructions } from "./utils/cacheInstructions";
import { readFile, writeFile, getTestFiles } from "./utils/loadFile";
import { TCache } from './types/cacheType';
import { mappingCache } from './services/cache';

const directory = "C://Users//upflo//OneDrive//Área de Trabalho//IFMG/memory-mapping//src//docs";
const directoryDestiny = path.resolve(__dirname, './doc-parsed');
const files = getTestFiles(directory);

files.forEach(file => {
    const instructions: string[] = readFile(path.join(directory, file));
    const cacheObj: TCache = cacheInstructions(instructions);
    const cacheOutput: number[] = mappingCache(cacheObj);
    const outputFileName = file.replace('.txt', '-RESULTADO.txt');
    writeFile(path.join(directoryDestiny, outputFileName), cacheOutput);
})
