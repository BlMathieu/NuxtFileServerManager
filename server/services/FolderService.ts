import fs from 'node:fs';
import path from 'node:path';
import AbstractDirectory from './AbstractDirectory';
import type IFolderResponse from '../responses/IFolderResponse';

const config = useRuntimeConfig();
const defaultPath: string = path.resolve(config.DEFAULT_PATH);

export default class FolderService extends AbstractDirectory {
    constructor() { super(); }

    public override add(folderPath: string): void {
        fs.mkdirSync(folderPath);
    }

    public override delete(url: string): void {
        fs.rmdirSync(url);
    }

    public override get(url: string): IFolderResponse {
        const fileNames = fs.readdirSync(url);
        const folderItems = fileNames.map((fileName: string) => {
            const itemPath = path.join(url, fileName);
            const isDirectory = fs.statSync(itemPath).isDirectory();
            return { name: fileName, isFolder: isDirectory }
        });
        
        let responseUrl = url.replace(defaultPath,'');
        if(responseUrl == '') responseUrl = '/';

        return {
            items: folderItems,
            folderPath: responseUrl
        }
    }
}
