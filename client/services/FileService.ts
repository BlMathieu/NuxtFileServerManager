import axios from "axios";
import AbstractDirectoryService from "./AbstractDirectoryService";

export default class FileService extends AbstractDirectoryService {
    constructor() { super("/api/file"); }

    save(filePath: string, content: string): void {
        axios.post(`${this.dirPath}/save`, { filePath: filePath, content: content }).catch((err) => {
            console.error(err);
        });
    }
    async download(filePath: string): Promise<File> {
        const data = await axios.get(`${this.dirPath}/download`, { params: { filePath: filePath }, responseType: 'blob' }).then((response) => {
            return new File([response.data], "obj");
        }).catch((err) => {
            console.error(err);
        });
        return data as File;
    }
}