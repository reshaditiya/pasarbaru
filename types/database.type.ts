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
      toko: {
        Row: {
          alamat: string | null;
          created_at: string;
          desa: string | null;
          email: string | null;
          foto_url: string | null;
          id: string;
          kabupaten: string | null;
          kecamatan: string | null;
          nama_pemilik: string | null;
          nama_toko: string | null;
          no_hp: string | null;
        };
        Insert: {
          alamat?: string | null;
          created_at?: string;
          desa?: string | null;
          email?: string | null;
          foto_url?: string | null;
          id: string;
          kabupaten?: string | null;
          kecamatan?: string | null;
          nama_pemilik?: string | null;
          nama_toko?: string | null;
          no_hp?: string | null;
        };
        Update: {
          alamat?: string | null;
          created_at?: string;
          desa?: string | null;
          email?: string | null;
          foto_url?: string | null;
          id?: string;
          kabupaten?: string | null;
          kecamatan?: string | null;
          nama_pemilik?: string | null;
          nama_toko?: string | null;
          no_hp?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "toko_id_fkey";
            columns: ["id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
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
