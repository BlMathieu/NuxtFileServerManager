import multer from "multer";
import path from "node:path";

export default defineEventHandler(async (event) => {
    try {
        if (event.node.req.method != 'POST') throw new Error('Wrong request method !');
        const config = useRuntimeConfig();
        const defaultPath: string = path.resolve(config.DEFAULT_PATH);
        const data = await readFormData(event);
        const files = data.getAll('files');

        const upload = multer({dest: defaultPath});
    } catch (err: any) {
        console.error(err);
        throw createError({ statusCode: 500, message: err.message })
    }
});