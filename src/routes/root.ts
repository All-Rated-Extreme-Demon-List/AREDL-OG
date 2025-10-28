import { Hono } from 'hono';
import { ogRoutes } from '@/routes/og/route';

export type HonoApp = { Bindings: CloudflareBindings };

const app = new Hono<HonoApp>();

app.route('/og', await ogRoutes());

export default app;
