import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

const SUPABASE_URL = "https://cqxmxmbdgaclglhrbuii.supabase.co";
const SUPABASE_PUBLISHABLE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNxeG14bWJkZ2FjbGdsaHJidWlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU3MzI1MTAsImV4cCI6MjA2MTMwODUxMH0.eCLq8LA-HqfJ88pGSFZ5me6m-r5wOEEtu4wfHyqYpPo";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
);
