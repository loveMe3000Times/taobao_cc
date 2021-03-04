/**
 * 将 Object类型 转换为 FormData类型
 * @param {Object} object
 * @returns  FormData()
 */
export function Object2FormData(object) {
    let fd = new FormData();
    let keyArray = Array.from(Object.keys(object)); // 对象键数组

    for (let i = 0; i < keyArray.length; i++) {
        let key = keyArray[i];
        fd.append(key, object[key]);
    }
    return fd;
}