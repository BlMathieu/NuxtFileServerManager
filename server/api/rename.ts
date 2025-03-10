import FolderService from "~/server/services/FolderService";
import SecurePath from "~/server/utils/SecurePath";
export default defineEventHandler(async (event) => {
    try {
        if (event.node.req.method != 'PATCH') throw new Error('Wrong request method !');
        const { oldPath, newPath } = await readBody(event).then((data) => { return { oldPath: data.oldPath, newPath: data.newPath } });

        const securedOldPath = SecurePath(oldPath);
        const securedNewPath = SecurePath(newPath);

        const service = new FolderService();
        service.rename(securedOldPath, securedNewPath);
    } catch (err:any) {
        console.error(err);
        throw createError({statusCode:500, message: err.message})
    }
});