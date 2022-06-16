import * as fs from "fs"

function readCookie(): string[]{
    const fileData = JSON.parse(fs.readFileSync(__dirname+"/data/cookie.json", "utf-8")).cookies;
    return fileData;
}

export class DFM {
    static cookies: string[] = readCookie();

}