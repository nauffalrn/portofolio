# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Admin CMS setup (Supabase)

All portfolio content (profile, experience, projects, achievements) is stored in Supabase and managed from `/admin` instead of being hardcoded. One-time setup:

1. **Create a Supabase project** at [supabase.com](https://supabase.com) (free tier is enough).
2. **Run the schema**: open your project's SQL Editor and run the contents of [`supabase/schema.sql`](supabase/schema.sql). This creates the `profile`, `experiences`, `projects`, `certificates` tables, sets up Row Level Security (public read, authenticated write), and creates the `portfolio-assets` storage bucket.
3. **Create your admin account**: in the Supabase dashboard go to Authentication > Users > Add user, and set your own email + password. This is the only account that can log in to `/admin` — there is no public sign-up.
4. **Configure env vars**: copy `.env.example` to `.env` and fill in your project's URL and anon key (Settings > API in the Supabase dashboard).
   ```
   VITE_SUPABASE_URL=...
   VITE_SUPABASE_ANON_KEY=...
   ```
5. **(Optional) Migrate existing content**: to load the portfolio's current hardcoded projects/experience/certificates (and their images) into Supabase, run the seed script once with your **service role key** (Settings > API — keep this secret, never put it in `.env`/client code):
   ```
   SUPABASE_URL=https://xxxx.supabase.co SUPABASE_SERVICE_ROLE_KEY=your-service-role-key node scripts/seed.mjs
   ```
   If you skip this, the `profile` row still exists (empty) and you can fill everything in from `/admin` manually.
6. **Deploy**: if hosting on Vercel or Netlify, add the same env vars in the hosting dashboard. `vercel.json` / `public/_redirects` are already set up so client-side routes like `/admin` don't 404 on refresh.

Once set up, log in at `/admin/login` and manage everything (including display order, via the ↑/↓ buttons on each list) from `/admin`.
