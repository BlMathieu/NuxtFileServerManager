import AbstractDirectoryService from "./AbstractDirectoryService";

export default class FolderService extends AbstractDirectoryService {
    constructor() { super("/api/folder"); }
}