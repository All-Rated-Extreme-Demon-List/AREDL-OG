import { Hono } from 'hono';
import { getPack } from '@/utils/queries';
import { HonoOGApp } from '@/routes/root';
import { PackInfoNode } from '@/routes/packs.$packid/nodes';
import { ogHandler } from '@/utils/og';

export function packRoutes() {
    const app = new Hono<HonoOGApp>();

    app.on(
        ['GET', 'HEAD'],
        '/:packId',
        ogHandler(async (context, format, width, height) => {
            const packId = context.req.param('packId');
            const list =
                (context.req.query('list') as 'classic' | 'platformer') ||
                'classic';

            const { pack, tier } = await getPack(context.env, list, packId);
            if (!pack || !tier) {
                return new Response('Pack not found', { status: 404 });
            }

            return context.var.renderer.render(
                await PackInfoNode({ pack, tier }),
                {
                    width,
                    height,
                    format,
                },
            );
        }),
    );

    return app;
}
