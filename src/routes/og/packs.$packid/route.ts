import { Hono } from 'hono';
import { getPack } from '@/utils/queries';
import { HonoOGApp } from '@/routes/og/route';
import { PackInfoNode } from '@/routes/og/packs.$packid/nodes';

export function packRoutes() {
    const app = new Hono<HonoOGApp>();

    app.get('/:packId', async (context) => {
        const packId = context.req.param('packId');
        const list =
            (context.req.query('list') as 'classic' | 'platformer') ||
            'classic';

        const { pack, tier } = await getPack(context.env, list, packId);
        if (!pack || !tier) {
            return new Response('Pack not found', { status: 404 });
        }

        const webp = context.var.renderer.render(
            await PackInfoNode({ pack, tier }),
            {
                width: 1200,
                height: 630,
                format: 'webp',
            },
        );

        return new Response(webp, {
            headers: {
                'Content-Type': 'image/webp',
                'Cache-Control': 'public, max-age=3600',
            },
        });
    });

    return app;
}
