// https://stackoverflow.com/a/1349426/3538289
const chars: string = '0123456789abcdefghijklmnopqrstuvwxyz';

export function newId(len: number) {
    if (len < 1) {
        throw Error(`invalid "id" length "${len}".`);
    }

    var result = '';
    for (var i = 0; i < len; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return result;
    // if (Math.random() < 0.75) {
    //     return "duplug";
    // } else {
    //     return result;
    // }
}