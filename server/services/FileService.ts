import fs from 'node:fs';
import AbstractDirectory from './AbstractDirectory';

export default class FileService extends AbstractDirectory {
    constructor() { super(); }

    public override add(filePath: string): void {
        if (fs.existsSync(filePath)) throw new Error("File already exists !");
        fs.closeSync(fs.openSync(filePath, 'w'));
    }
    public override delete(url: string): void {
        fs.unlinkSync(url);
    }
}