export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      apartments: {
        Row: {
          front_id: number | null
          id: number
          kitchen_type_id: number
          name: string | null
          ready_for_order: boolean | null
          total_cost: number | null
          user_id: string | null
          worktop_id: number | null
        }
        Insert: {
          front_id?: number | null
          id?: number
          kitchen_type_id: number
          name?: string | null
          ready_for_order?: boolean | null
          total_cost?: number | null
          user_id?: string | null
          worktop_id?: number | null
        }
        Update: {
          front_id?: number | null
          id?: number
          kitchen_type_id?: number
          name?: string | null
          ready_for_order?: boolean | null
          total_cost?: number | null
          user_id?: string | null
          worktop_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "apartments_front_id_fkey"
            columns: ["front_id"]
            referencedRelation: "fronts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "apartments_kitchen_type_id_fkey"
            columns: ["kitchen_type_id"]
            referencedRelation: "kitchen_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "apartments_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "apartments_worktop_id_fkey"
            columns: ["worktop_id"]
            referencedRelation: "worktops"
            referencedColumns: ["id"]
          }
        ]
      }
      front_colors: {
        Row: {
          color_code: string | null
          front_id: number
          id: number
          name: string | null
        }
        Insert: {
          color_code?: string | null
          front_id: number
          id?: number
          name?: string | null
        }
        Update: {
          color_code?: string | null
          front_id?: number
          id?: number
          name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "front_colors_front_id_fkey"
            columns: ["front_id"]
            referencedRelation: "fronts"
            referencedColumns: ["id"]
          }
        ]
      }
      front_options: {
        Row: {
          front_id: number | null
          id: number
          kitchen_type_id: number
          price: number | null
        }
        Insert: {
          front_id?: number | null
          id?: number
          kitchen_type_id: number
          price?: number | null
        }
        Update: {
          front_id?: number | null
          id?: number
          kitchen_type_id?: number
          price?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "front_options_front_id_fkey"
            columns: ["front_id"]
            referencedRelation: "fronts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "front_options_kitchen_type_id_fkey"
            columns: ["kitchen_type_id"]
            referencedRelation: "kitchen_types"
            referencedColumns: ["id"]
          }
        ]
      }
      fronts: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      kitchen_types: {
        Row: {
          id: number
          name: string | null
          project_id: number
          standard_front: number | null
          standard_worktop: number | null
        }
        Insert: {
          id?: number
          name?: string | null
          project_id: number
          standard_front?: number | null
          standard_worktop?: number | null
        }
        Update: {
          id?: number
          name?: string | null
          project_id?: number
          standard_front?: number | null
          standard_worktop?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "kitchen_types_project_id_fkey"
            columns: ["project_id"]
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "kitchen_types_standard_front_fkey"
            columns: ["standard_front"]
            referencedRelation: "fronts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "kitchen_types_standard_worktop_fkey"
            columns: ["standard_worktop"]
            referencedRelation: "worktops"
            referencedColumns: ["id"]
          }
        ]
      }
      projects: {
        Row: {
          id: number
          name: string | null
        }
        Insert: {
          id?: number
          name?: string | null
        }
        Update: {
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          app_role: Database["public"]["Enums"]["app_role"] | null
          email: string | null
          full_name: string | null
          id: string
        }
        Insert: {
          app_role?: Database["public"]["Enums"]["app_role"] | null
          email?: string | null
          full_name?: string | null
          id: string
        }
        Update: {
          app_role?: Database["public"]["Enums"]["app_role"] | null
          email?: string | null
          full_name?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      worktop_colors: {
        Row: {
          color: string | null
          id: number
          name: string | null
          worktop_id: number
        }
        Insert: {
          color?: string | null
          id?: number
          name?: string | null
          worktop_id: number
        }
        Update: {
          color?: string | null
          id?: number
          name?: string | null
          worktop_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "worktop_colors_worktop_id_fkey"
            columns: ["worktop_id"]
            referencedRelation: "worktops"
            referencedColumns: ["id"]
          }
        ]
      }
      worktop_options: {
        Row: {
          id: number
          kitchen_type_id: number
          price: number | null
          worktop_id: number | null
        }
        Insert: {
          id?: number
          kitchen_type_id: number
          price?: number | null
          worktop_id?: number | null
        }
        Update: {
          id?: number
          kitchen_type_id?: number
          price?: number | null
          worktop_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "worktop_options_kitchen_type_id_fkey"
            columns: ["kitchen_type_id"]
            referencedRelation: "kitchen_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "worktop_options_worktop_id_fkey"
            columns: ["worktop_id"]
            referencedRelation: "worktops"
            referencedColumns: ["id"]
          }
        ]
      }
      worktops: {
        Row: {
          id: number
          make: string
        }
        Insert: {
          id?: number
          make: string
        }
        Update: {
          id?: number
          make?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: {
        Args: {
          uid_param: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "client"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
