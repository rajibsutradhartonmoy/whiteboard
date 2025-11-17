-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- USER PROFILES
-- ============================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  username TEXT UNIQUE,
  bio TEXT,
  preferences JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- PROJECTS
-- ============================================
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  description TEXT,
  database_type TEXT NOT NULL DEFAULT 'postgresql',
  owner_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  organization_id UUID,
  is_public BOOLEAN DEFAULT FALSE,
  settings JSONB DEFAULT '{}'::jsonb,
  canvas_state JSONB DEFAULT '{}'::jsonb,
  tags TEXT[] DEFAULT '{}',
  folder_id UUID,
  archived_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- SCHEMA TABLES
-- ============================================
CREATE TABLE IF NOT EXISTS public.schema_tables (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  schema_name TEXT DEFAULT 'public',
  description TEXT,
  color TEXT DEFAULT '#3b82f6',
  position JSONB NOT NULL DEFAULT '{"x": 0, "y": 0}'::jsonb,
  is_view BOOLEAN DEFAULT FALSE,
  view_definition TEXT,
  table_options JSONB DEFAULT '{}'::jsonb,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(project_id, schema_name, name)
);

-- ============================================
-- SCHEMA COLUMNS
-- ============================================
CREATE TABLE IF NOT EXISTS public.schema_columns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  table_id UUID NOT NULL REFERENCES public.schema_tables(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  data_type TEXT NOT NULL,
  is_primary_key BOOLEAN DEFAULT FALSE,
  is_nullable BOOLEAN DEFAULT TRUE,
  is_unique BOOLEAN DEFAULT FALSE,
  is_array BOOLEAN DEFAULT FALSE,
  default_value TEXT,
  check_constraint TEXT,
  description TEXT,
  ordinal_position INTEGER NOT NULL,
  column_options JSONB DEFAULT '{}'::jsonb,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(table_id, name)
);

-- ============================================
-- SCHEMA RELATIONSHIPS
-- ============================================
CREATE TABLE IF NOT EXISTS public.schema_relationships (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  name TEXT,
  source_table_id UUID NOT NULL REFERENCES public.schema_tables(id) ON DELETE CASCADE,
  target_table_id UUID NOT NULL REFERENCES public.schema_tables(id) ON DELETE CASCADE,
  source_column_id UUID NOT NULL REFERENCES public.schema_columns(id) ON DELETE CASCADE,
  target_column_id UUID NOT NULL REFERENCES public.schema_columns(id) ON DELETE CASCADE,
  relationship_type TEXT NOT NULL CHECK (relationship_type IN ('one-to-one', 'one-to-many', 'many-to-many')),
  on_delete TEXT DEFAULT 'NO ACTION',
  on_update TEXT DEFAULT 'NO ACTION',
  is_composite BOOLEAN DEFAULT FALSE,
  composite_columns JSONB DEFAULT '[]'::jsonb,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- COMMENTS
-- ============================================
CREATE TABLE IF NOT EXISTS public.comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  table_id UUID REFERENCES public.schema_tables(id) ON DELETE CASCADE,
  column_id UUID REFERENCES public.schema_columns(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES public.comments(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id),
  content TEXT NOT NULL,
  mentions UUID[] DEFAULT '{}',
  resolved BOOLEAN DEFAULT FALSE,
  resolved_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- ACTIVITIES
-- ============================================
CREATE TABLE IF NOT EXISTS public.activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id),
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id UUID,
  changes JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- PRESENCE
-- ============================================
CREATE TABLE IF NOT EXISTS public.presence (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  cursor_position JSONB,
  selected_elements UUID[] DEFAULT '{}',
  last_active TIMESTAMPTZ DEFAULT NOW(),
  status TEXT DEFAULT 'active',
  UNIQUE(project_id, user_id)
);

-- ============================================
-- PROJECT VERSIONS
-- ============================================
CREATE TABLE IF NOT EXISTS public.project_versions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  version_number INTEGER NOT NULL,
  name TEXT,
  description TEXT,
  snapshot JSONB NOT NULL,
  parent_version_id UUID REFERENCES public.project_versions(id),
  is_branch BOOLEAN DEFAULT FALSE,
  branch_name TEXT,
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(project_id, version_number)
);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX IF NOT EXISTS idx_projects_owner ON public.projects(owner_id);
CREATE INDEX IF NOT EXISTS idx_schema_tables_project ON public.schema_tables(project_id);
CREATE INDEX IF NOT EXISTS idx_schema_columns_table ON public.schema_columns(table_id);
CREATE INDEX IF NOT EXISTS idx_schema_relationships_project ON public.schema_relationships(project_id);
CREATE INDEX IF NOT EXISTS idx_activities_project ON public.activities(project_id);
CREATE INDEX IF NOT EXISTS idx_activities_created ON public.activities(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_comments_project ON public.comments(project_id);
CREATE INDEX IF NOT EXISTS idx_presence_project ON public.presence(project_id);
CREATE INDEX IF NOT EXISTS idx_project_versions_project ON public.project_versions(project_id);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.schema_tables ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.schema_columns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.schema_relationships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.presence ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_versions ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Projects policies
CREATE POLICY "Users can view own projects" ON public.projects
  FOR SELECT USING (owner_id = auth.uid() OR is_public = true);

CREATE POLICY "Users can create projects" ON public.projects
  FOR INSERT WITH CHECK (owner_id = auth.uid());

CREATE POLICY "Users can update own projects" ON public.projects
  FOR UPDATE USING (owner_id = auth.uid());

CREATE POLICY "Users can delete own projects" ON public.projects
  FOR DELETE USING (owner_id = auth.uid());

-- Schema tables policies
CREATE POLICY "Users can view schema tables" ON public.schema_tables
  FOR SELECT USING (
    project_id IN (
      SELECT id FROM public.projects WHERE owner_id = auth.uid() OR is_public = true
    )
  );

CREATE POLICY "Users can create schema tables" ON public.schema_tables
  FOR INSERT WITH CHECK (
    project_id IN (SELECT id FROM public.projects WHERE owner_id = auth.uid())
  );

CREATE POLICY "Users can update schema tables" ON public.schema_tables
  FOR UPDATE USING (
    project_id IN (SELECT id FROM public.projects WHERE owner_id = auth.uid())
  );

CREATE POLICY "Users can delete schema tables" ON public.schema_tables
  FOR DELETE USING (
    project_id IN (SELECT id FROM public.projects WHERE owner_id = auth.uid())
  );

-- Schema columns policies
CREATE POLICY "Users can view schema columns" ON public.schema_columns
  FOR SELECT USING (
    table_id IN (
      SELECT id FROM public.schema_tables WHERE project_id IN (
        SELECT id FROM public.projects WHERE owner_id = auth.uid() OR is_public = true
      )
    )
  );

CREATE POLICY "Users can manage schema columns" ON public.schema_columns
  FOR ALL USING (
    table_id IN (
      SELECT id FROM public.schema_tables WHERE project_id IN (
        SELECT id FROM public.projects WHERE owner_id = auth.uid()
      )
    )
  );

-- Schema relationships policies
CREATE POLICY "Users can view relationships" ON public.schema_relationships
  FOR SELECT USING (
    project_id IN (
      SELECT id FROM public.projects WHERE owner_id = auth.uid() OR is_public = true
    )
  );

CREATE POLICY "Users can manage relationships" ON public.schema_relationships
  FOR ALL USING (
    project_id IN (SELECT id FROM public.projects WHERE owner_id = auth.uid())
  );

-- Comments policies
CREATE POLICY "Users can view comments" ON public.comments
  FOR SELECT USING (
    project_id IN (
      SELECT id FROM public.projects WHERE owner_id = auth.uid() OR is_public = true
    )
  );

CREATE POLICY "Users can create comments" ON public.comments
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own comments" ON public.comments
  FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Users can delete own comments" ON public.comments
  FOR DELETE USING (user_id = auth.uid());

-- Activities policies
CREATE POLICY "Users can view activities" ON public.activities
  FOR SELECT USING (
    project_id IN (
      SELECT id FROM public.projects WHERE owner_id = auth.uid() OR is_public = true
    )
  );

CREATE POLICY "Users can create activities" ON public.activities
  FOR INSERT WITH CHECK (user_id = auth.uid());

-- Presence policies
CREATE POLICY "Users can view presence" ON public.presence
  FOR SELECT USING (
    project_id IN (
      SELECT id FROM public.projects WHERE owner_id = auth.uid() OR is_public = true
    )
  );

CREATE POLICY "Users can manage own presence" ON public.presence
  FOR ALL USING (user_id = auth.uid());

-- Version history policies
CREATE POLICY "Users can view versions" ON public.project_versions
  FOR SELECT USING (
    project_id IN (
      SELECT id FROM public.projects WHERE owner_id = auth.uid() OR is_public = true
    )
  );

CREATE POLICY "Users can create versions" ON public.project_versions
  FOR INSERT WITH CHECK (
    project_id IN (SELECT id FROM public.projects WHERE owner_id = auth.uid())
  );

-- ============================================
-- FUNCTIONS
-- ============================================

-- Function to automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on signup
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at triggers
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_schema_tables_updated_at
  BEFORE UPDATE ON public.schema_tables
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_schema_columns_updated_at
  BEFORE UPDATE ON public.schema_columns
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_schema_relationships_updated_at
  BEFORE UPDATE ON public.schema_relationships
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_comments_updated_at
  BEFORE UPDATE ON public.comments
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
