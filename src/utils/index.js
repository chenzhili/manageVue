/* 判定当前数据的 类型 */
const class2type = {};
const core_toString = class2type.toString;
"Boolean Number String Function Array Date RegExp Object Error".split(" ").forEach((name) => {
    class2type[`[object ${name}]`] = name.toLowerCase();
});
export function type(obj) {
    if (obj == null) {
        return String(obj);
    }
    return typeof obj === "object" || typeof obj === "function" ?
        class2type[core_toString.call(obj)] || "object" :
        typeof obj;
}