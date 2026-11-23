-- WORLD ZERO initial Supabase/PostgreSQL schema draft.
-- Apply only after reviewing and configuring Supabase Auth/RLS for the deployment.

create extension if not exists pgcrypto;

create table if not exists campaigns (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null default '',
  target_language text not null default 'ja',
  created_by uuid not null references auth.users(id) on delete cascade,
  world_state jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists campaign_members (
  campaign_id uuid not null references campaigns(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null default 'player' check (role in ('host','player')),
  joined_at timestamptz not null default now(),
  primary key (campaign_id, user_id)
);

create table if not exists characters (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid not null references campaigns(id) on delete cascade,
  owner_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  species text not null default 'Human',
  character_class text not null default 'Adventurer',
  background text not null default '',
  level integer not null default 1 check (level >= 1),
  experience integer not null default 0 check (experience >= 0),
  hit_points integer not null default 10,
  max_hit_points integer not null default 10,
  attributes jsonb not null default '{"strength":10,"dexterity":10,"constitution":10,"intelligence":10,"wisdom":10,"charisma":10}'::jsonb,
  skills jsonb not null default '{}'::jsonb,
  appearance jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists language_profiles (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid not null references campaigns(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  language_code text not null default 'ja',
  skill_estimates jsonb not null default '{"vocabulary":0,"reading":0,"listening":0,"speaking":0,"grammar":0,"inference":0}'::jsonb,
  immersion_preference text not null default 'hybrid',
  updated_at timestamptz not null default now(),
  unique (campaign_id, user_id, language_code)
);

create table if not exists inventory_items (
  id uuid primary key default gen_random_uuid(),
  character_id uuid not null references characters(id) on delete cascade,
  item_key text not null,
  name text not null,
  description text not null default '',
  quantity integer not null default 1 check (quantity >= 0),
  equipped_slot text,
  properties jsonb not null default '{}'::jsonb
);

create table if not exists quests (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid not null references campaigns(id) on delete cascade,
  title text not null,
  description text not null default '',
  status text not null default 'available' check (status in ('available','active','completed','failed')),
  objectives jsonb not null default '[]'::jsonb,
  consequences jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists world_entities (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid not null references campaigns(id) on delete cascade,
  entity_type text not null check (entity_type in ('location','npc','faction','settlement','encounter')),
  name text not null,
  state jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists campaign_events (
  id bigint generated always as identity primary key,
  campaign_id uuid not null references campaigns(id) on delete cascade,
  actor_user_id uuid references auth.users(id) on delete set null,
  event_type text not null,
  summary text not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists campaign_events_campaign_created_idx
  on campaign_events (campaign_id, created_at desc);
create index if not exists characters_campaign_idx on characters (campaign_id);
create index if not exists world_entities_campaign_type_idx on world_entities (campaign_id, entity_type);

-- RLS policies are intentionally not enabled here. Before production, enable RLS
-- on every user-facing table and add policies that verify campaign_members
-- membership and character owner_id. Never ship with permissive public policies.
