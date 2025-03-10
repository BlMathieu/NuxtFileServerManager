import { it, expect, describe } from "vitest";
import SecurePath from "~/server/utils/SecurePath";
import path from "node:path";

const config = useRuntimeConfig();
const defaultPath: string = path.resolve(config.DEFAULT_PATH);

it('test basic url joined', () => {
    const url = "layer/test/../test/machin.exe"
    const securedPath = SecurePath(url);
    expect(securedPath).toBe(`${defaultPath}/layer/test/machin.exe`)
})

it('test consume ../ if url is valid', () => {
    const url = "layer/test/../machin.exe"
    const securedPath = SecurePath(url);
    expect(securedPath).toBe(`${defaultPath}/layer/machin.exe`)
})

it('test path outrange', () => {
    const url = "../layer/test/machin.exe"
    expect(()=>SecurePath(url)).toThrowError('Path outrange !');
})

it('test ../', () => {
    const url = "/layer/test/../machin.exe"
    const securedPath = SecurePath(url);
    expect(!securedPath.includes('../')).toBeTruthy();
})