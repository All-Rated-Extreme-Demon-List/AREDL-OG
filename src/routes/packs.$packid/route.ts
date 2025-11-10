import { Hono } from 'hono';
import { HonoOGApp } from '@/routes/root';
import { PackInfoNode } from '@/routes/packs.$packid/nodes';
import { ogHandler } from '@/utils/og';
import { parseQueryData } from '@/utils/search';
import { PackOGData } from '@/types/packs';

export function packRoutes() {
    const app = new Hono<HonoOGApp>();

    app.on(
        ['GET', 'HEAD'],
        '/',
        ogHandler(async (context) => {
            const { pack, tier } = await parseQueryData<PackOGData>(context);
            if (!pack || !tier) {
                throw new Response('Pack not found', { status: 404 });
            }

            return await PackInfoNode({ pack, tier });
        }),
    );

    return app;
}
