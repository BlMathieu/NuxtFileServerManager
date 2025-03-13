import axios from "axios";

export default abstract class AbstractDirectoryService {

    protected dirPath: string;

    constructor(dir: string) { this.dirPath = dir; }

    public async get(path: string): Promise<any> {
        const items = await axios(`${this.dirPath}/get`, { params: { path: path } })
            .then((response) => { return response.data })
            .catch((err) => {
                console.error(err);
                return [];
            })
        return items
    }

    public async delete(path: string): Promise<void> {
        await axios.delete(`${this.dirPath}/delete`, { data: { itemPath: path } }).catch((err) => { console.error(err) });
    }

    public async add(path: string): Promise<void> {
        await axios.post(`${this.dirPath}/add`, { itemPath: path }).catch((err) => { console.error(err) });
    }

    public async rename(oldPath: string, newPath: string): Promise<void> {
        await axios.patch(`/api/rename`, { oldPath: oldPath, newPath: newPath }).catch((err) => { console.error(err) });
    }
}