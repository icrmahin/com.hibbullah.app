export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          name: string;
          email: string | null;
          phone: string;
          role: "customer" | "admin";
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["profiles"]["Row"], "created_at"> & {
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
      };
      products: {
        Row: {
          id: string;
          name: string;
          brand: string;
          generic_name: string;
          manufacturer_id: string;
          category_id: string;
          description: string;
          price: number;
          original_price: number | null;
          discount_percent: number | null;
          unit: string;
          image_path: string | null;
          is_active: boolean;
          is_featured: boolean;
          created_at: string;
        };
        Insert: Database["public"]["Tables"]["products"]["Row"];
        Update: Partial<Database["public"]["Tables"]["products"]["Insert"]>;
      };
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
        };
        Insert: Database["public"]["Tables"]["categories"]["Row"];
        Update: Partial<Database["public"]["Tables"]["categories"]["Insert"]>;
      };
      manufacturers: {
        Row: {
          id: string;
          name: string;
          country: string | null;
        };
        Insert: Database["public"]["Tables"]["manufacturers"]["Row"];
        Update: Partial<Database["public"]["Tables"]["manufacturers"]["Insert"]>;
      };
      product_batches: {
        Row: {
          id: string;
          product_id: string;
          batch_number: string;
          quantity: number;
          expiry_date: string;
          purchase_cost: number | null;
          status: "active" | "expired" | "depleted";
        };
        Insert: Database["public"]["Tables"]["product_batches"]["Row"];
        Update: Partial<Database["public"]["Tables"]["product_batches"]["Insert"]>;
      };
      carts: {
        Row: { id: string; customer_id: string; updated_at: string };
        Insert: Database["public"]["Tables"]["carts"]["Row"];
        Update: Partial<Database["public"]["Tables"]["carts"]["Insert"]>;
      };
      cart_items: {
        Row: {
          id: string;
          cart_id: string;
          product_id: string;
          quantity: number;
        };
        Insert: Database["public"]["Tables"]["cart_items"]["Row"];
        Update: Partial<Database["public"]["Tables"]["cart_items"]["Insert"]>;
      };
      delivery_cycles: {
        Row: {
          id: string;
          customer_id: string;
          status: string;
          started_at: string;
          closes_at: string;
        };
        Insert: Database["public"]["Tables"]["delivery_cycles"]["Row"];
        Update: Partial<Database["public"]["Tables"]["delivery_cycles"]["Insert"]>;
      };
      orders: {
        Row: {
          id: string;
          order_number: string;
          customer_id: string;
          delivery_cycle_id: string | null;
          status: string;
          subtotal: number;
          discount: number;
          delivery_fee: number;
          total: number;
          payment_method: "CASH_ON_DELIVERY";
          address_id: string | null;
          created_at: string;
        };
        Insert: Database["public"]["Tables"]["orders"]["Row"];
        Update: Partial<Database["public"]["Tables"]["orders"]["Insert"]>;
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          product_id: string;
          quantity: number;
          unit_price: number;
          discount_percent: number;
          total: number;
        };
        Insert: Database["public"]["Tables"]["order_items"]["Row"];
        Update: Partial<Database["public"]["Tables"]["order_items"]["Insert"]>;
      };
      addresses: {
        Row: {
          id: string;
          customer_id: string;
          label: string;
          street: string;
          city: string;
          county: string | null;
          postal_code: string | null;
          is_default: boolean;
        };
        Insert: Database["public"]["Tables"]["addresses"]["Row"];
        Update: Partial<Database["public"]["Tables"]["addresses"]["Insert"]>;
      };
      notifications: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          body: string;
          type: string;
          read: boolean;
          created_at: string;
        };
        Insert: Database["public"]["Tables"]["notifications"]["Row"];
        Update: Partial<Database["public"]["Tables"]["notifications"]["Insert"]>;
      };
      returns: {
        Row: {
          id: string;
          order_id: string;
          customer_id: string;
          product_id: string;
          quantity: number;
          reason: string;
          status: string;
          created_at: string;
        };
        Insert: Database["public"]["Tables"]["returns"]["Row"];
        Update: Partial<Database["public"]["Tables"]["returns"]["Insert"]>;
      };
      audit_logs: {
        Row: {
          id: string;
          actor_id: string;
          action: string;
          record_type: string;
          record_id: string;
          old_value: Json | null;
          new_value: Json | null;
          created_at: string;
        };
        Insert: Database["public"]["Tables"]["audit_logs"]["Row"];
        Update: Partial<Database["public"]["Tables"]["audit_logs"]["Insert"]>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      order_status:
        | "PENDING"
        | "CONFIRMED"
        | "PROCESSING"
        | "OUT_FOR_DELIVERY"
        | "DELIVERED"
        | "CANCELLED"
        | "RETURNED";
      user_role: "customer" | "admin";
    };
  };
};
