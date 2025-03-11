import FolderService from "~/server/services/FolderService";
import SecurePath from "~/server/utils/SecurePath";
import path from "node:path";
export default defineEventHandler((event) => {
    try {
        if (event.node.req.method != 'GET') throw new Error('Wrong request method !');
        const folderPath = getQuery(event).folderPath?.toString() || "";
        const securedPath = SecurePath(folderPath);

        const service = new FolderService();
        const data = service.download(securedPath);

        const folderName = path.basename(securedPath) + '.zip';
        event.node.res.setHeader('Content-Disposition', `attachment; filename=${folderName}`);
        event.node.res.setHeader('Content-Type', 'application/zip');
        console.log("data: "+ data);
        return sendStream(event, data);
    } catch (err: any) {
        console.error(err);
        throw createError({ statusCode: 500, statusMessage: err.message })
    }
});
