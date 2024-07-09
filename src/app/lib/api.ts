export function resource_url(res_name: string, res_id, origin: string = ''){
    const res_to_path_map = new Map([
        ['film', '/api/films'],
        ['actor', '/api/actors'],
    ])
    if (!res_to_path_map.has(res_name)) return String(res_id);
    const res_path = res_to_path_map.get(res_name);
    const path = res_path + '/' + String(res_id);
    const url = origin
        ? new URL(path, origin).toString()
        : path;
    return url;
}
