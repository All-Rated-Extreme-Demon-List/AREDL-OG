import { userProfileNode } from '@/routes/profile/user/nodes';
import { Hono } from 'hono';
import { HonoOGApp } from '@/routes/root';
import { ogHandler } from '@/utils/og';
import { ProfileOGData } from '@/types/profiles';
import { parseQueryData } from '@/utils/search';

export function userProfileRoute() {
    const app = new Hono<HonoOGApp>();

    app.on(
        ['GET', 'HEAD'],
        '/',
        ogHandler(async (context) => {
            const profileOGData = await parseQueryData<ProfileOGData>(context);
            return await userProfileNode(profileOGData);
        }),
    );

    return app;
}
