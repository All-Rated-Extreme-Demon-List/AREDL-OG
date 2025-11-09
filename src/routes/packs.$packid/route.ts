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
        ogHandler(async (context) => {
            const packId = context.req.param('packId');
            const list =
                (context.req.query('list') as 'classic' | 'platformer') ||
                'classic';

            const { pack, tier } = await getPack(context.env, list, packId);
            if (!pack || !tier) {
                throw new Response('Pack not found', { status: 404 });
            }

            return await PackInfoNode({ pack, tier });
        }),
    );

    return app;
}
