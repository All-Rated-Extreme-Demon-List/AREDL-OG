import { Hono } from 'hono';
import { profileRoutes } from '@/routes/og/profile/route';
import { HonoApp } from '@/routes/root';
import { initSync, Renderer } from '@takumi-rs/wasm';
import { env } from 'cloudflare:workers';
import { createMiddleware } from 'hono/factory';
import module from '@takumi-rs/wasm/takumi_wasm_bg.wasm';
import { packRoutes } from '@/routes/og/packs.$packid/route';

export async function ogRoutes() {
    const app = new Hono<HonoApp>();

    app.use(rendererMiddleware);

    app.route('/profile', profileRoutes());
    app.route('/packs', packRoutes());
    return app;
}

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
