import FileService from "~/server/services/FileService";
import SecurePath from "~/server/utils/SecurePath";
export default defineEventHandler(async (event) => {
    try {
        if (event.node.req.method != 'DELETE') throw new Error('Wrong request method !');
        const filePath = await readBody(event).then((data) => { return data.itemPath });
        const securedPath = SecurePath(filePath);
        const service = new FileService();
        service.delete(securedPath);
        return { message: `Le dossier : ${filePath} a bien été supprimé !` }
    } catch (err: any) {
        console.error(err);
        throw createError({ statusCode: 500, message: err.message });
    }
});
