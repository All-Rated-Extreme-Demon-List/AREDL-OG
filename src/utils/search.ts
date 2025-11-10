import { HonoOGApp } from '@/routes/root';
import { Context } from 'hono';

export const parseQueryData = async <T = unknown>(
    context: Context<HonoOGApp>,
): Promise<T> => {
    const data = context.req.query('data');
    if (data) {
        const [payload, sig] = data.split('.', 2);
        if (
            payload &&
            sig &&
            (await verify(payload, sig, context.env.OG_DATA_SECRET))
        ) {
            const data = JSON.parse(new TextDecoder().decode(decode(payload)));
            return data as T;
        }
    }

    throw new Response('Invalid or missing data', { status: 400 });
};

function decode(s: string): Uint8Array {
    const pad = s.length % 4 ? 4 - (s.length % 4) : 0;
    const base64 = s.replace(/-/g, '+').replace(/_/g, '/') + '='.repeat(pad);
    return new Uint8Array(Buffer.from(base64, 'base64'));
}

async function verify(
    payload: string,
    sigHex: string,
    secret: string,
): Promise<boolean> {
    const key = await crypto.subtle.importKey(
        'raw',
        Buffer.from(secret),
        { name: 'HMAC', hash: 'SHA-256' },
        false,
        ['verify', 'sign'],
    );
    const sig = Buffer.from(sigHex, 'hex');

    return await crypto.subtle.verify(
        'HMAC',
        key,
        sig,
        new TextEncoder().encode(payload),
    );
}
