import { Hono } from 'hono';
import { userProfileRoute } from '@/routes/og/profile/user.$userid/route';
import { HonoOGApp } from '@/routes/og/route';

export function profileRoutes() {
    const app = new Hono<HonoOGApp>();

    app.route('/user', userProfileRoute());

    return app;
}
