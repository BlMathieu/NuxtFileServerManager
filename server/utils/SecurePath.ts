import path from "node:path";

export default function SecurePath(pathToSecure: string): string {
    const isUrlNull = pathToSecure == "" || pathToSecure == null;
    if (isUrlNull) throw new Error(`Invalid path !`);

    const config = useRuntimeConfig();
    const defaultPath: string = path.resolve(config.DEFAULT_PATH);

    if (!defaultPath) throw new Error("Invalid default path !");

    const finalUrl = path.join(defaultPath, path.normalize(pathToSecure));
    const escapedUrl = path.resolve(finalUrl);

    if (!escapedUrl.startsWith(defaultPath)) throw new Error(`Path outrange !`)
    return escapedUrl;
};