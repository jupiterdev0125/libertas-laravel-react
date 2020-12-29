export function fixJSONIDIntParse(jsonString) {
    return JSON.parse(jsonString.replace(/"id":(\d+),/g, '"id":"$1",'));
}

export function fixJSONIDIntStringify(list) {
    return JSON.stringify(list).replace(/"id":"(\d+)",/g, '"id":$1,');
}
