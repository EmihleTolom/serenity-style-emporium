import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase =
  supabaseUrl && supabasePublishableKey
    ? createClient(supabaseUrl, supabasePublishableKey)
    : null;

export const ADMIN_USER_ID = "250bdd6e-f7c8-4053-9397-63223b982180";
export const PRODUCT_MEDIA_BUCKET = "product-media";
