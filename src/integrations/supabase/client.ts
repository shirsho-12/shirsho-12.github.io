import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
// console.log("Supabase URL:", import.meta.env.VITE_SUPABASE_URL);
// console.log(
//   "Supabase Publishable Key:",
//   import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
// );

export const supabase = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
);
