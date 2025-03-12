import fs from 'node:fs';
import AbstractDirectory from './AbstractDirectory';
import type IFileResponse from '../responses/IFileResponse';
import path from 'node:path';
import { canOpen, imgFormat } from '../utils/fileFormat';
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
    public override get(filePath: string): IFileResponse {
        if (!fs.existsSync(filePath)) throw new Error('File does not exists !');
        const fileName = path.basename(filePath);
        if (!canOpen.some(co => fileName.includes(co))) throw new Error('Invalid file format !');
        let data;
        if (imgFormat.some(f => fileName.includes(f))) data = fs.readFileSync(filePath).toString('base64');
        else data = fs.readFileSync(filePath).toString();
        return { content: data };
    }
    public save(filePath: string, content: string): void {
        if (!fs.existsSync(filePath)) throw new Error('File does not exists !');
        fs.writeFileSync(filePath, content);
    }
    public override download(filePath: string) {
        if (!fs.existsSync(filePath)) throw new Error('File does not exists !');
        const content = fs.createReadStream(filePath);
        return content;
    }
}