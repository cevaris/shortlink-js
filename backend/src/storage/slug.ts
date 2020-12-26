
// https://stackoverflow.com/a/1349426/3538289
const SlugChars: string = '0123456789abcdefghijklmnopqrstuvwxyz';

export function newSlug(len: number) {
    if (len < 1) {
        throw Error(`invalid newSlug length "${len}".`);
    }

    var result = '';
    for (var i = 0; i < len; i++) {
        result += SlugChars.charAt(Math.floor(Math.random() * SlugChars.length));
    }

    return result;
    // if (Math.random() < 0.75) {
    //     return "duplug";
    // } else {
    //     return result;
    // }
}