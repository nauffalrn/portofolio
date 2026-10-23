-- Run once in Supabase Dashboard > SQL Editor, BEFORE deploying the matching
-- frontend. Adds the fields edited by the admin panel for the site refresh.
-- Safe to re-run.

-- Projects: optional live demo link, shown on the card only when filled in.
alter table projects add column if not exists live_url text not null default '';

-- Certificates: highlighted achievements get a larger card above the course list.
alter table certificates add column if not exists is_highlight boolean not null default false;
