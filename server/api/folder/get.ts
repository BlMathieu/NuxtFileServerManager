import FolderService from "~/server/services/FolderService";
import SecurePath from "~/server/utils/SecurePath";
export default defineEventHandler((event) => {
    try {
        if (event.node.req.method != 'GET') throw new Error('Wrong request method !');
        const query = getQuery(event);
        const folderPath = query.path?.toString() || "";

        const securedPath = SecurePath(folderPath);

        const folderService = new FolderService();
        return folderService.get(securedPath);
    } catch (err: any) {
        console.error(err);
        throw createError({ statusCode: 500, message: err.message })
    }
})