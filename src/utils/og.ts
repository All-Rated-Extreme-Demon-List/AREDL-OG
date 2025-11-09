import type { Context } from 'hono';

export type OgFormat = 'png' | 'jpeg' | 'webp';

export type BotRule = {
    test: RegExp;
    forceFormat?: OgFormat;
};

export type OgRenderOptions = {
    width?: number;
    height?: number;
    defaultFormat?: OgFormat;
    allowQueryOverride?: boolean;
    cacheControl?: string;
    extraVary?: string[];
    botRules?: BotRule[];
};

export type OgRenderer = (params: {
    width: number;
    height: number;
    format: OgFormat;
}) => Promise<
    Uint8Array | ArrayBuffer | Blob | Response | ReadableStream | any
>;

export function pickFormat(
    ua: string,
    accept: string,
    opts?: OgRenderOptions,
): OgFormat {
    const {
        defaultFormat = 'png',
        botRules = [
            { test: /\bdiscordbot\b/i, forceFormat: 'png' },
            { test: /\bslackbot\b/i, forceFormat: 'png' },
            { test: /\btwitterbot\b/i, forceFormat: 'png' },
            { test: /\bfacebookexternalhit\b/i, forceFormat: 'png' },
            { test: /\btelegrambot\b/i, forceFormat: 'png' },
            { test: /\blinkedinbot\b/i, forceFormat: 'png' },
        ],
    } = opts || {};

    for (const rule of botRules) {
        if (rule.test.test(ua)) return rule.forceFormat ?? 'png';
    }

    if (/\bimage\/webp\b/i.test(accept)) return 'webp';
    if (/\bimage\/jpeg\b/i.test(accept)) return 'jpeg';

    return defaultFormat;
}

export function mimeFor(format: OgFormat): string {
    switch (format) {
        case 'jpeg':
            return 'image/jpeg';
        case 'webp':
            return 'image/webp';
        default:
            return 'image/png';
    }
}

export function ogHandler(
    render: (
        c: Context,
        format: OgFormat,
        width: number,
        height: number,
    ) => Promise<
        Uint8Array | ArrayBuffer | Blob | Response | ReadableStream | any
    >,
    options?: OgRenderOptions,
) {
    const {
        width = 1200,
        height = 630,
        allowQueryOverride = true,
        cacheControl = 'public, max-age=604800, immutable',
        extraVary = [],
    } = options || {};

    return async (c: Context) => {
        const ua = c.req.header('user-agent') || '';
        const accept = c.req.header('accept') || '';

        let format = pickFormat(ua, accept, options);

        if (allowQueryOverride) {
            const q = (c.req.query('fmt') || '').toLowerCase();
            if (q === 'png' || q === 'jpeg' || q === 'webp') {
                format = q as OgFormat;
            }
        }

        let rendered = await render(c, format, width, height);
        const bytes = await toUint8Array(rendered);

        const vary = ['Accept', 'User-Agent', ...extraVary]
            .map((s) => s.trim())
            .filter(Boolean)
            .join(', ');

        const headers = new Headers({
            'Content-Type': mimeFor(format),
            'Cache-Control': cacheControl,
            Vary: vary,
            'Content-Length': String(bytes.byteLength),
        });

        if (c.req.method === 'HEAD') {
            return new Response(null, { status: 200, headers });
        }
        return new Response(bytes, { status: 200, headers });
    };
}

async function toUint8Array(
    data: Uint8Array | ArrayBuffer | Blob | Response | ReadableStream | any,
): Promise<Uint8Array> {
    if (data instanceof Uint8Array) return data;
    if (data instanceof ArrayBuffer) return new Uint8Array(data);
    if (typeof Blob !== 'undefined' && data instanceof Blob) {
        return new Uint8Array(await data.arrayBuffer());
    }
    if (typeof Response !== 'undefined' && data instanceof Response) {
        return new Uint8Array(await data.arrayBuffer());
    }
    const res = new Response(data as any);
    return new Uint8Array(await res.arrayBuffer());
}
