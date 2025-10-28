import { userProfileNode } from '@/routes/og/profile/user.$userid/nodes';
import { Hono } from 'hono';
import { getUserProfile } from '@/utils/queries';
import { HonoOGApp } from '@/routes/og/route';

export function userProfileRoute() {
    const app = new Hono<HonoOGApp>();

    app.get('/:userId', async (context) => {
        const userId = context.req.param('userId');
        const list =
            (context.req.query('list') as 'classic' | 'platformer') ||
            'classic';

        const profileOGData = await getUserProfile(context.env, list, userId);

        const webp = context.var.renderer.render(
            await userProfileNode(profileOGData),
            {
                width: 1200,
                height: 630,
                format: 'webp',
            },
        );

        return new Response(webp, {
            headers: {
                'Content-Type': 'image/webp',
                'Cache-Control': 'public, max-age=0',
            },
        });
    });

    return app;
}
