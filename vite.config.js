import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Serve admin.html for /admin/* in `vite dev` and `vite preview`, mirroring
// the production rewrites in vercel.json / public/_redirects.
const adminRewrite = () => {
  const middleware = (req, _res, next) => {
    if (/^\/admin(\/|$|\?)/.test(req.url)) req.url = '/admin.html'
    next()
  }
  return {
    name: 'admin-rewrite',
    // Block bodies on purpose: a returned function would run as a post-hook.
    configureServer(server) {
      server.middlewares.use(middleware)
    },
    configurePreviewServer(server) {
      server.middlewares.use(middleware)
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), adminRewrite()],
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        admin: 'admin.html',
      },
    },
  },
})
