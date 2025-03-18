import fs from 'fs';
export default class BackupService {
    constructor() { };

    getAllFilesRecursive(folderPath: string): string[] {
        const objects = fs.readdirSync(folderPath);
        let paths: string[] = [];
        objects.forEach((o: string) => {
            const objectPath = `${folderPath}/${o}`;
            if (fs.statSync(objectPath).isDirectory()) paths = paths.concat(this.getAllFilesRecursive(objectPath));
            else paths.push(objectPath);
        });
        return paths;
    }

    getFilesWeigth(files: string[]) {
        let weight: number = 0;
        files.forEach((p) => {
            weight += fs.statSync(p).size;
        })
        return weight;
    }
}   