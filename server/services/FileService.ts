import fs, { ReadStream } from 'node:fs';
import AbstractDirectory from './AbstractDirectory';
export default class FileService extends AbstractDirectory {

    constructor() { super(); }

    public override add(filePath: string): void {
        if (fs.existsSync(filePath)) throw new Error("File already exists !");
        fs.closeSync(fs.openSync(filePath, 'w'));
    }
    public override delete(url: string): void {
        if (!fs.existsSync(url)) throw new Error('File does not exists !');
        fs.unlinkSync(url);
    }
    public override get(filePath: string): ReadStream {
        if (!fs.existsSync(filePath)) throw new Error('File does not exists !');
        const data = fs.createReadStream(filePath)
        return data
    }
    public save(filePath: string, content: string): void {
        if (!fs.existsSync(filePath)) throw new Error('File does not exists !');
        fs.writeFileSync(filePath, content);
    }
}