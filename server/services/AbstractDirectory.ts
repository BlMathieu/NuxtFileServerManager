import path from "node:path";
import type IDirectoryResponse from "../responses/IDirectoryResponse";
import fs from 'node:fs';


export default abstract class AbstractDirectory {
    protected baseUrl: string;
    constructor() {
        const config = useRuntimeConfig();
        this.baseUrl = config.DEFAULT_PATH;
    }
    public add(path: string): void { throw new Error("Not implemented !"); };
    public delete(path: string): void { throw new Error("Not implemented !"); };
    public rename(oldPath: string, newPath: string): void {
        try {
            fs.renameSync(path.resolve(oldPath), path.resolve(newPath));
        } catch (err) {
            console.error(err);
            throw err;
        }
    };
    public get(path: string): IDirectoryResponse { throw new Error("Not implemented !"); };
}