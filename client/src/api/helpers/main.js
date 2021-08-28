export function withParams(params, url) {
    if (params) {
        let is_first = true;
        Object.entries(params).forEach(([key, value]) => {
            if (value) {
                url += is_first ? '?' : '&';
                url += `${key}=${encodeURIComponent(value)}`;
                is_first = false;
            }
        });
    }
    return url
}