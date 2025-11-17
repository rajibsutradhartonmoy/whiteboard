export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          username: string | null;
          bio: string | null;
          preferences: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          username?: string | null;
          bio?: string | null;
          preferences?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          username?: string | null;
          bio?: string | null;
          preferences?: Json;
          created_at?: string;
          updated_at?: string;
        };
      };
      organizations: {
        Row: {
          id: string;
          name: string;
          slug: string;
          logo_url: string | null;
          settings: Json;
          subscription_tier: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          logo_url?: string | null;
          settings?: Json;
          subscription_tier?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          logo_url?: string | null;
          settings?: Json;
          subscription_tier?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      projects: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          database_type: string;
          owner_id: string;
          organization_id: string | null;
          is_public: boolean;
          settings: Json;
          canvas_state: Json;
          tags: string[];
          folder_id: string | null;
          archived_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          database_type?: string;
          owner_id: string;
          organization_id?: string | null;
          is_public?: boolean;
          settings?: Json;
          canvas_state?: Json;
          tags?: string[];
          folder_id?: string | null;
          archived_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          database_type?: string;
          owner_id?: string;
          organization_id?: string | null;
          is_public?: boolean;
          settings?: Json;
          canvas_state?: Json;
          tags?: string[];
          folder_id?: string | null;
          archived_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      schema_tables: {
        Row: {
          id: string;
          project_id: string;
          name: string;
          schema_name: string;
          description: string | null;
          color: string;
          position: Json;
          is_view: boolean;
          view_definition: string | null;
          table_options: Json;
          metadata: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          name: string;
          schema_name?: string;
          description?: string | null;
          color?: string;
          position?: Json;
          is_view?: boolean;
          view_definition?: string | null;
          table_options?: Json;
          metadata?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          project_id?: string;
          name?: string;
          schema_name?: string;
          description?: string | null;
          color?: string;
          position?: Json;
          is_view?: boolean;
          view_definition?: string | null;
          table_options?: Json;
          metadata?: Json;
          created_at?: string;
          updated_at?: string;
        };
      };
      schema_columns: {
        Row: {
          id: string;
          table_id: string;
          name: string;
          data_type: string;
          is_primary_key: boolean;
          is_nullable: boolean;
          is_unique: boolean;
          is_array: boolean;
          default_value: string | null;
          check_constraint: string | null;
          description: string | null;
          ordinal_position: number;
          column_options: Json;
          metadata: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          table_id: string;
          name: string;
          data_type: string;
          is_primary_key?: boolean;
          is_nullable?: boolean;
          is_unique?: boolean;
          is_array?: boolean;
          default_value?: string | null;
          check_constraint?: string | null;
          description?: string | null;
          ordinal_position: number;
          column_options?: Json;
          metadata?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          table_id?: string;
          name?: string;
          data_type?: string;
          is_primary_key?: boolean;
          is_nullable?: boolean;
          is_unique?: boolean;
          is_array?: boolean;
          default_value?: string | null;
          check_constraint?: string | null;
          description?: string | null;
          ordinal_position?: number;
          column_options?: Json;
          metadata?: Json;
          created_at?: string;
          updated_at?: string;
        };
      };
      schema_relationships: {
        Row: {
          id: string;
          project_id: string;
          name: string | null;
          source_table_id: string;
          target_table_id: string;
          source_column_id: string;
          target_column_id: string;
          relationship_type: string;
          on_delete: string;
          on_update: string;
          is_composite: boolean;
          composite_columns: Json;
          metadata: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          name?: string | null;
          source_table_id: string;
          target_table_id: string;
          source_column_id: string;
          target_column_id: string;
          relationship_type: string;
          on_delete?: string;
          on_update?: string;
          is_composite?: boolean;
          composite_columns?: Json;
          metadata?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          project_id?: string;
          name?: string | null;
          source_table_id?: string;
          target_table_id?: string;
          source_column_id?: string;
          target_column_id?: string;
          relationship_type?: string;
          on_delete?: string;
          on_update?: string;
          is_composite?: boolean;
          composite_columns?: Json;
          metadata?: Json;
          created_at?: string;
          updated_at?: string;
        };
      };
      comments: {
        Row: {
          id: string;
          project_id: string;
          table_id: string | null;
          column_id: string | null;
          parent_id: string | null;
          user_id: string;
          content: string;
          mentions: string[];
          resolved: boolean;
          resolved_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          table_id?: string | null;
          column_id?: string | null;
          parent_id?: string | null;
          user_id: string;
          content: string;
          mentions?: string[];
          resolved?: boolean;
          resolved_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          project_id?: string;
          table_id?: string | null;
          column_id?: string | null;
          parent_id?: string | null;
          user_id?: string;
          content?: string;
          mentions?: string[];
          resolved?: boolean;
          resolved_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      activities: {
        Row: {
          id: string;
          project_id: string;
          user_id: string;
          action: string;
          entity_type: string;
          entity_id: string | null;
          changes: Json | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          user_id: string;
          action: string;
          entity_type: string;
          entity_id?: string | null;
          changes?: Json | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          project_id?: string;
          user_id?: string;
          action?: string;
          entity_type?: string;
          entity_id?: string | null;
          changes?: Json | null;
          created_at?: string;
        };
      };
      presence: {
        Row: {
          id: string;
          project_id: string;
          user_id: string;
          cursor_position: Json | null;
          selected_elements: string[];
          last_active: string;
          status: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          user_id: string;
          cursor_position?: Json | null;
          selected_elements?: string[];
          last_active?: string;
          status?: string;
        };
        Update: {
          id?: string;
          project_id?: string;
          user_id?: string;
          cursor_position?: Json | null;
          selected_elements?: string[];
          last_active?: string;
          status?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
