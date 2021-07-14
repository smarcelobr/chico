export class StringUtil {
    static escapeForRegex(str: string) {
        return str.replace(new RegExp('([\[\\\^\$\.\|\?\*\+\(\)])','mg'), '\$1');
    }
}