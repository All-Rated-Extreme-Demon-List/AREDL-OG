import { Hono } from 'hono';
import { createMiddleware } from 'hono/factory';
import { initSync, Renderer } from '@takumi-rs/wasm';
import { env } from 'cloudflare:workers';
import module from '@takumi-rs/wasm/takumi_wasm_bg.wasm';
import { profileRoutes } from '@/routes/profile/route';
import { packRoutes } from '@/routes/packs.$packid/route';

export type HonoApp = { Bindings: CloudflareBindings };
export type HonoOGApp = HonoApp & {
    Variables: {
        renderer: Renderer;
    };
};

const rendererMiddleware = createMiddleware<HonoOGApp>(async (c, next) => {
    if (!c.var.renderer) {
        initSync({ module });
        const renderer = new Renderer();

        try {
            const fontsResponses = await Promise.all([
                env.ASSETS.fetch(
                    'https://assets.local/fonts/Poppins-Regular.ttf',
                ),
                env.ASSETS.fetch(
                    'https://assets.local/fonts/Poppins-SemiBold.ttf',
                ),
            ]);
            for (const response of fontsResponses) {
                if (response.ok) {
                    renderer.loadFont(
                        new Uint8Array(await response.arrayBuffer()),
                    );
                }
            }
        } catch {}
        c.set('renderer', renderer);
    }
    await next();
});

const app = new Hono<HonoApp>();

app.use(rendererMiddleware);

app.route('/profile', profileRoutes());
app.route('/packs', packRoutes());

export default app;
