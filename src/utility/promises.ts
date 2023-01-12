import {promisify} from "util";

export const sleep = promisify(setTimeout);

export function sleepTill(stop: number) {
    return sleep(stop - Date.now());
}