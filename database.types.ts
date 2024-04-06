export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      _InternshipToJobType: {
        Row: {
          A: number
          B: number
        }
        Insert: {
          A: number
          B: number
        }
        Update: {
          A?: number
          B?: number
        }
        Relationships: [
          {
            foreignKeyName: "_InternshipToJobType_A_fkey"
            columns: ["A"]
            isOneToOne: false
            referencedRelation: "Internship"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "_InternshipToJobType_B_fkey"
            columns: ["B"]
            isOneToOne: false
            referencedRelation: "JobType"
            referencedColumns: ["id"]
          },
        ]
      }
      _prisma_migrations: {
        Row: {
          applied_steps_count: number
          checksum: string
          finished_at: string | null
          id: string
          logs: string | null
          migration_name: string
          rolled_back_at: string | null
          started_at: string
        }
        Insert: {
          applied_steps_count?: number
          checksum: string
          finished_at?: string | null
          id: string
          logs?: string | null
          migration_name: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Update: {
          applied_steps_count?: number
          checksum?: string
          finished_at?: string | null
          id?: string
          logs?: string | null
          migration_name?: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Relationships: []
      }
      Company: {
        Row: {
          createdAt: string
          description: string | null
          id: number
          logo: string | null
          name: string
          websiteUrl: string | null
        }
        Insert: {
          createdAt?: string
          description?: string | null
          id?: number
          logo?: string | null
          name: string
          websiteUrl?: string | null
        }
        Update: {
          createdAt?: string
          description?: string | null
          id?: number
          logo?: string | null
          name?: string
          websiteUrl?: string | null
        }
        Relationships: []
      }
      Internship: {
        Row: {
          comment: string
          companyId: number
          createdAt: string
          end_date: string
          expectationsVsReality: string
          hourlyWage: number
          id: number
          isAnonymous: boolean
          learnings: string
          mentoringValue: string
          name: string
          projectDescription: string
          rating: number
          socialAspects: string
          start_date: string
          teamSize: number
          userId: number
        }
        Insert: {
          comment: string
          companyId: number
          createdAt?: string
          end_date: string
          expectationsVsReality: string
          hourlyWage: number
          id?: number
          isAnonymous: boolean
          learnings: string
          mentoringValue: string
          name: string
          projectDescription: string
          rating: number
          socialAspects: string
          start_date: string
          teamSize: number
          userId: number
        }
        Update: {
          comment?: string
          companyId?: number
          createdAt?: string
          end_date?: string
          expectationsVsReality?: string
          hourlyWage?: number
          id?: number
          isAnonymous?: boolean
          learnings?: string
          mentoringValue?: string
          name?: string
          projectDescription?: string
          rating?: number
          socialAspects?: string
          start_date?: string
          teamSize?: number
          userId?: number
        }
        Relationships: [
          {
            foreignKeyName: "Internship_companyId_fkey"
            columns: ["companyId"]
            isOneToOne: false
            referencedRelation: "Company"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Internship_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
        ]
      }
      InternshipTechnology: {
        Row: {
          internshipId: number
          technologyId: number
        }
        Insert: {
          internshipId: number
          technologyId: number
        }
        Update: {
          internshipId?: number
          technologyId?: number
        }
        Relationships: [
          {
            foreignKeyName: "InternshipTechnology_internshipId_fkey"
            columns: ["internshipId"]
            isOneToOne: false
            referencedRelation: "Internship"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "InternshipTechnology_technologyId_fkey"
            columns: ["technologyId"]
            isOneToOne: false
            referencedRelation: "Technology"
            referencedColumns: ["id"]
          },
        ]
      }
      JobType: {
        Row: {
          id: number
          type: string
        }
        Insert: {
          id?: number
          type: string
        }
        Update: {
          id?: number
          type?: string
        }
        Relationships: []
      }
      JobTypeTechnology: {
        Row: {
          jobTypeId: number
          technologyId: number
        }
        Insert: {
          jobTypeId: number
          technologyId: number
        }
        Update: {
          jobTypeId?: number
          technologyId?: number
        }
        Relationships: [
          {
            foreignKeyName: "JobTypeTechnology_jobTypeId_fkey"
            columns: ["jobTypeId"]
            isOneToOne: false
            referencedRelation: "JobType"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "JobTypeTechnology_technologyId_fkey"
            columns: ["technologyId"]
            isOneToOne: false
            referencedRelation: "Technology"
            referencedColumns: ["id"]
          },
        ]
      }
      Technology: {
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
      User: {
        Row: {
          createdAt: string
          email: string
          id: number
          name: string
          username: string
        }
        Insert: {
          createdAt?: string
          email: string
          id?: number
          name: string
          username: string
        }
        Update: {
          createdAt?: string
          email?: string
          id?: number
          name?: string
          username?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
