import FileService from "~/server/services/FileService";
import SecurePath from "~/server/utils/SecurePath";
import path from 'node:path';
export default defineEventHandler((event) => {
    try {
        if (event.node.req.method != 'GET') throw new Error('Wrong request method !');
        const filePath = getQuery(event).filePath?.toString() || "";
        const securedPath = SecurePath(filePath);
        const service = new FileService();
        const data = service.download(securedPath);
        const fileName = path.basename(securedPath);
        event.node.res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
        event.node.res.setHeader('Content-Type', 'application/octet-stream');
        return sendStream(event, data);
    } catch (err: any) {
        console.error(err);
        throw createError({ statusCode: 500, statusMessage: err.message })
    }
});
