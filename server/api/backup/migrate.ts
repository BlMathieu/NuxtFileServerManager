import fs from "fs";
import path from "path";
export default defineEventHandler((event) => {
    try {
        if (event.node.req.method != 'POST') throw new Error('Wrong request method !');
        const config = useRuntimeConfig();
        const defaultPath: string = path.resolve(config.DEFAULT_PATH);
        const backupPath: string = path.resolve(config.BACKUP_PATH);
        fs.cpSync(defaultPath, backupPath, { recursive: true, force: true });
        return { status: true };
    } catch (err: any) {
        console.error(err);
        throw createError({ statusCode: 500, statusMessage: err.message })
    }
});
