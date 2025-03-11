import type IDirectoryResponse from "~/server/responses/IDirectoryResponse";
import axios from "axios";

export default abstract class AbstractDirectoryService {

    protected dirPath: string;

    constructor(dir: string) { this.dirPath = dir; }

    public async get(path: string): Promise<IDirectoryResponse> {
        const folders = await axios<IDirectoryResponse>(`${this.dirPath}/get`, { params: { path: path } })
            .then((response) => { return response.data })
            .catch((err) => {
                console.error(err);
                return [];
            })
        return folders
    }

    public delete(path: string): void {
        axios.delete(`${this.dirPath}/delete`, { data: { itemPath: path } }).catch((err) => { console.error(err) });
    }

    public add(path: string): void {
        axios.post(`${this.dirPath}/add`, { itemPath: path }).catch((err) => { console.error(err) });
    }

    public rename(oldPath: string, newPath: string): void {
        axios.patch(`/api/rename`, { oldPath: oldPath, newPath: newPath }).catch((err) => { console.error(err) });
    }
}