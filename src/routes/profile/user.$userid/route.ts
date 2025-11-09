import { userProfileNode } from '@/routes/profile/user.$userid/nodes';
import { Hono } from 'hono';
import { getUserProfile } from '@/utils/queries';
import { HonoOGApp } from '@/routes/root';
import { ogHandler } from '@/utils/og';

export function userProfileRoute() {
    const app = new Hono<HonoOGApp>();

    app.on(
        ['GET', 'HEAD'],
        '/:userId',
        ogHandler(async (context, format, width, height) => {
            const userId = context.req.param('userId');
            const list =
                (context.req.query('list') as 'classic' | 'platformer') ||
                'classic';

            const profileOGData = await getUserProfile(
                context.env,
                list,
                userId,
            );

            return context.var.renderer.render(
                await userProfileNode(profileOGData),
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
