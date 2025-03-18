import fs from "fs";
import path from "path";
import BackupService from "~/server/services/BackupService";
export default defineEventHandler((event) => {
    try {
        if (event.node.req.method != 'GET') throw new Error('Wrong request method !');
        const config = useRuntimeConfig();
        const defaultPath: string = path.resolve(config.DEFAULT_PATH);
        const backupPath: string = path.resolve(config.BACKUP_PATH);
        const service = new BackupService();
        let defaultFolder = fs.readdirSync(defaultPath, { recursive: true }) as string[];
        defaultFolder = defaultFolder.map((s: string) => {
            return path.join(defaultPath, s);
        })
        const defaultFilesPath = service.getAllFilesRecursive(defaultPath);
        const defaultPathSize = service.getFilesWeigth(defaultFilesPath);
        const backupFilesPath = service.getAllFilesRecursive(backupPath);
        const backupPathSize = service.getFilesWeigth(backupFilesPath);
        const isSameSize = defaultPathSize == backupPathSize;
        return { status: isSameSize };
    } catch (err: any) {
        console.error(err);
        throw createError({ statusCode: 500, statusMessage: err.message })
    }
});
