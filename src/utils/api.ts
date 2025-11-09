export async function send<T = unknown>(
    env: CloudflareBindings,
    path: string,
    query?: Record<string, unknown>,
): Promise<T> {
    const base = (env?.API_BASE_URL || 'https://api.aredl.net/v2/api')
        .replace(/\/+$|\/$/g, '')
        .replace(/\/$/, '');
    const cleanPath = path.replace(/^\/+|\/+$/g, '');
    const requestURL = new URL(`${base}/${cleanPath}`);

    if (query) {
        for (const [key, value] of Object.entries(query)) {
            if (value === undefined || value === null) continue;
            requestURL.searchParams.set(key, String(value));
        }
    }
    const response = await fetch(requestURL.toString());

    if (!response.ok) {
        throw response;
    }

    const contentType = response.headers.get('content-type') || '';
    const data = (
        contentType.includes('application/json')
            ? await response.json()
            : await response.text()
    ) as T & { message?: string };

    return data as T;
}
