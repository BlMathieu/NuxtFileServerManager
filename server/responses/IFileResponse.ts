import type IDirectoryResponse from "./IDirectoryResponse";

export default interface IFileResponse extends IDirectoryResponse {
    content:string,
    
}