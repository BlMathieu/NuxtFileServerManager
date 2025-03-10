import AbstractDirectoryService from "./AbstractDirectoryService";

export default class FileService extends AbstractDirectoryService {
    constructor() { super("/api/file"); }
}