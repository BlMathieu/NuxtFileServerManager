import FileService from "~/server/services/FileService";
import SecurePath from "~/server/utils/SecurePath";
export default defineEventHandler(async (event) => {
    try {
        if (event.node.req.method != 'POST') throw new Error('Wrong request method !');
        const {filePath, content} = await readBody(event).then((data) => { return data });
        const securedPath = SecurePath(filePath);
        const service = new FileService();
        service.save(securedPath, content);
        return { message: 'Le contenu du fichier à bien été enregistré !' }
    } catch (err: any) {
        console.error(err);
        throw createError({ statusCode: 500, statusMessage: err.message })
    }
});
