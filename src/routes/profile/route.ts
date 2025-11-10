import { Hono } from 'hono';
import { userProfileRoute } from '@/routes/profile/user/route';
import { HonoOGApp } from '@/routes/root';

export function profileRoutes() {
    const app = new Hono<HonoOGApp>();

    app.route('/user', userProfileRoute());

    return app;
}
