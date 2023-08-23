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
      produk: {
        Row: {
          created_at: string
          foto_url1: string | null
          foto_url2: string | null
          foto_url3: string | null
          harga_beli: number
          harga_jual: number
          id: number
          id_toko: string | null
          jenis: string | null
          nama: string
          satuan: string | null
        }
        Insert: {
          created_at?: string
          foto_url1?: string | null
          foto_url2?: string | null
          foto_url3?: string | null
          harga_beli?: number
          harga_jual?: number
          id?: number
          id_toko?: string | null
          jenis?: string | null
          nama: string
          satuan?: string | null
        }
        Update: {
          created_at?: string
          foto_url1?: string | null
          foto_url2?: string | null
          foto_url3?: string | null
          harga_beli?: number
          harga_jual?: number
          id?: number
          id_toko?: string | null
          jenis?: string | null
          nama?: string
          satuan?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "produk_id_toko_fkey"
            columns: ["id_toko"]
            referencedRelation: "toko"
            referencedColumns: ["id"]
          }
        ]
      }
      toko: {
        Row: {
          alamat: string | null
          created_at: string
          desa: string | null
          email: string
          foto_url: string | null
          id: string
          kabupaten: string | null
          kecamatan: string | null
          nama_pemilik: string
          nama_toko: string
          no_hp: string | null
        }
        Insert: {
          alamat?: string | null
          created_at?: string
          desa?: string | null
          email?: string
          foto_url?: string | null
          id: string
          kabupaten?: string | null
          kecamatan?: string | null
          nama_pemilik?: string
          nama_toko?: string
          no_hp?: string | null
        }
        Update: {
          alamat?: string | null
          created_at?: string
          desa?: string | null
          email?: string
          foto_url?: string | null
          id?: string
          kabupaten?: string | null
          kecamatan?: string | null
          nama_pemilik?: string
          nama_toko?: string
          no_hp?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "toko_id_fkey"
            columns: ["id"]
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
