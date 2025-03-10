import FolderService from "~/server/services/FolderService";
import SecurePath from "~/server/utils/SecurePath";
export default defineEventHandler(async (event) => {
    try {
        if (event.node.req.method != 'POST') throw new Error('Wrong request method !');
        const folderPath = await readBody(event).then((data) => { return data.itemPath });
        const securedPath = SecurePath(folderPath);
        const service = new FolderService();
        service.add(securedPath);
        return { message: `Le dossier : ${folderPath} a bien été supprimé !` }
    } catch (err: any) {
        console.error(err);
        throw createError({ statusCode: 500, message: err.message })
    }
})
