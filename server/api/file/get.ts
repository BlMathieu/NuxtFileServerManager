import FileService from "~/server/services/FileService";
import SecurePath from "~/server/utils/SecurePath";
export default defineEventHandler((event) => {
    try {
        if (event.node.req.method != 'GET') throw new Error('Wrong request method !');
        const filePath = getQuery(event).filePath?.toString() || "";
        const securedPath = SecurePath(filePath);
        const service = new FileService();
        const data = service.get(securedPath);
        return { content:  data }
    } catch (err: any) {
        console.error(err);
        throw createError({ statusCode: 500, statusMessage: err.message })
    }
});
