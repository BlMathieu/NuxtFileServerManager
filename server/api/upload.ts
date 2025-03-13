import path from "node:path";
import fs from 'node:fs';

export default defineEventHandler(async (event) => {
    try {
        if (event.node.req.method != 'POST') throw new Error('Wrong request method !');
        const data = await readFormData(event);
        const files = data.getAll('files');
        const itemPath = data.get('itemPath') as string;

        const securedPath = SecurePath(itemPath);

        files.forEach(async (file: any) => {
            const buffer = Buffer.from(await file.arrayBuffer());
            const filePath = path.join(securedPath, file.name);
            fs.writeFileSync(filePath, buffer);
        })

    } catch (err: any) {
        console.error(err);
        throw createError({ statusCode: 500, message: err.message })
    }
});