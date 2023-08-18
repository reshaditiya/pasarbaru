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
      toko: {
        Row: {
          alamat: string | null
          created_at: string
          desa: string | null
          email: string | null
          foto: string | null
          id: number
          kabupaten: string | null
          kecamatan: string | null
          nama_pemilik: string | null
          nama_toko: string | null
          no_hp: string | null
          user_id: string | null
        }
        Insert: {
          alamat?: string | null
          created_at?: string
          desa?: string | null
          email?: string | null
          foto?: string | null
          id?: number
          kabupaten?: string | null
          kecamatan?: string | null
          nama_pemilik?: string | null
          nama_toko?: string | null
          no_hp?: string | null
          user_id?: string | null
        }
        Update: {
          alamat?: string | null
          created_at?: string
          desa?: string | null
          email?: string | null
          foto?: string | null
          id?: number
          kabupaten?: string | null
          kecamatan?: string | null
          nama_pemilik?: string | null
          nama_toko?: string | null
          no_hp?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "toko_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
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
