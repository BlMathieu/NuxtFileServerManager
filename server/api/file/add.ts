import FileService from "~/server/services/FileService";
import SecurePath from "~/server/utils/SecurePath";
export default defineEventHandler(async (event) => {
    try {
        if (event.node.req.method != 'POST') throw new Error('Wrong request method !');
        const filePath = await readBody(event).then((data) => { return data.itemPath });
        const securedPath = SecurePath(filePath);
        const service = new FileService();
        service.add(securedPath);
        return { message: `Le fichier : ${filePath} a bien été ajouté !` }
    } catch (err:any) {
        console.error(err);
        throw createError({statusCode:500, statusMessage: err.message})
    }
});
