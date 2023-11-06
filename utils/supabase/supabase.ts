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
          front_option_id: number | null
          id: number
          kitchen_type_id: number
          name: string | null
          ready_for_order: boolean | null
          total_cost: number | null
          user_id: string | null
          worktop_option_id: number | null
        }
        Insert: {
          front_option_id?: number | null
          id?: number
          kitchen_type_id: number
          name?: string | null
          ready_for_order?: boolean | null
          total_cost?: number | null
          user_id?: string | null
          worktop_option_id?: number | null
        }
        Update: {
          front_option_id?: number | null
          id?: number
          kitchen_type_id?: number
          name?: string | null
          ready_for_order?: boolean | null
          total_cost?: number | null
          user_id?: string | null
          worktop_option_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "apartments_front_option_id_fkey"
            columns: ["front_option_id"]
            isOneToOne: false
            referencedRelation: "front_options"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "apartments_kitchen_type_id_fkey"
            columns: ["kitchen_type_id"]
            isOneToOne: false
            referencedRelation: "kitchen_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "apartments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "apartments_worktop_option_id_fkey"
            columns: ["worktop_option_id"]
            isOneToOne: false
            referencedRelation: "worktop_options"
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
            isOneToOne: false
            referencedRelation: "fronts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "front_options_kitchen_type_id_fkey"
            columns: ["kitchen_type_id"]
            isOneToOne: false
            referencedRelation: "kitchen_types"
            referencedColumns: ["id"]
          }
        ]
      }
      front_types: {
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
      fronts: {
        Row: {
          color: string | null
          front_type_id: number
          id: number
          name: string | null
        }
        Insert: {
          color?: string | null
          front_type_id: number
          id?: number
          name?: string | null
        }
        Update: {
          color?: string | null
          front_type_id?: number
          id?: number
          name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fronts_front_type_id_fkey"
            columns: ["front_type_id"]
            isOneToOne: false
            referencedRelation: "front_types"
            referencedColumns: ["id"]
          }
        ]
      }
      kitchen_types: {
        Row: {
          id: number
          name: string | null
          project_id: number
          standard_front_id: number | null
          standard_worktop_id: number | null
        }
        Insert: {
          id?: number
          name?: string | null
          project_id: number
          standard_front_id?: number | null
          standard_worktop_id?: number | null
        }
        Update: {
          id?: number
          name?: string | null
          project_id?: number
          standard_front_id?: number | null
          standard_worktop_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "kitchen_types_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "kitchen_types_standard_front_id_fkey"
            columns: ["standard_front_id"]
            isOneToOne: false
            referencedRelation: "fronts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "kitchen_types_standard_worktop_id_fkey"
            columns: ["standard_worktop_id"]
            isOneToOne: false
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
            isOneToOne: true
            referencedRelation: "users"
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
            isOneToOne: false
            referencedRelation: "kitchen_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "worktop_options_worktop_id_fkey"
            columns: ["worktop_id"]
            isOneToOne: false
            referencedRelation: "worktops"
            referencedColumns: ["id"]
          }
        ]
      }
      worktop_types: {
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
      worktops: {
        Row: {
          color: string | null
          id: number
          name: string | null
          worktop_type_id: number
        }
        Insert: {
          color?: string | null
          id?: number
          name?: string | null
          worktop_type_id: number
        }
        Update: {
          color?: string | null
          id?: number
          name?: string | null
          worktop_type_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "worktops_worktop_type_id_fkey"
            columns: ["worktop_type_id"]
            isOneToOne: false
            referencedRelation: "worktop_types"
            referencedColumns: ["id"]
          }
        ]
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
