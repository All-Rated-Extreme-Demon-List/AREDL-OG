import { HonoOGApp } from '@/routes/root';
import type { Context } from 'hono';
import type { RenderOptions } from '@takumi-rs/wasm';
import { Node } from '@takumi-rs/helpers';

export type OgRenderer = (renderOptions: RenderOptions) => Promise<Uint8Array>;
export type OgRenderOptions = RenderOptions & {
    cacheControl?: string;
};
export function ogHandler(
    nodeToRender: (context: Context<HonoOGApp>) => Promise<Node>,
    options?: OgRenderOptions,
) {
    const {
        width = 1200,
        height = 630,
        format = 'webp',
        cacheControl = 'public, max-age=3600, immutable',
        ...renderOptions
    } = options || {};

    return async (context: Context<HonoOGApp>) => {
        try {
            let node = await nodeToRender(context);

            let rendered = context.var.renderer.render(node, {
                width,
                height,
                format,
                ...renderOptions,
            });

            const headers = new Headers({
                'Content-Type': 'image/webp',
                'Cache-Control': cacheControl,
                'Content-Length': String(rendered.byteLength),
            });

            if (context.req.method === 'HEAD') {
                return new Response(null, { status: 200, headers });
            }
            return new Response(rendered, { status: 200, headers });
        } catch (error) {
            if (error instanceof Response) {
                return error;
            } else {
                console.error('OG Handler Error:', error);
                throw error;
            }
        }
    };
}
