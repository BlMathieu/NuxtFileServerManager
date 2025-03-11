import fs from 'node:fs';
import path from 'node:path';
import AbstractDirectory from './AbstractDirectory';
import type IFolderResponse from '../responses/IFolderResponse';
import archiver from 'archiver';

const config = useRuntimeConfig();
const defaultPath: string = path.resolve(config.DEFAULT_PATH);

export default class FolderService extends AbstractDirectory {
    constructor() { super(); }

    public override add(folderPath: string): void {
        if (fs.existsSync(folderPath)) throw new Error("Folder already exists !");
        fs.mkdirSync(folderPath);
    }

    public override delete(folderPath: string): void {
        if (!fs.existsSync(folderPath)) throw new Error("Folder does not exists !");
        fs.rmdirSync(folderPath);
    }

    public override get(folderPath: string): IFolderResponse {
        if (!fs.existsSync(folderPath)) throw new Error("Folder does not exists !");
        const fileNames = fs.readdirSync(folderPath);
        const folderItems = fileNames.map((fileName: string) => {
            const itemPath = path.join(folderPath, fileName);
            const isDirectory = fs.statSync(itemPath).isDirectory();
            return { name: fileName, isFolder: isDirectory }
        });

        let responseUrl = folderPath.replace(defaultPath, '');
        if (responseUrl == '') responseUrl = '/';

        return {
            items: folderItems,
            folderPath: responseUrl
        }
    }

    public override download(path: string) {
        if (!fs.existsSync(path)) throw new Error("Folder does not exists !");
        const zip = archiver('zip', {
            zlib: { level: 9 }
        })
        zip.directory(path, false);
        zip.finalize();
        return zip;
    }
}
