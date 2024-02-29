import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
	'https://ofcxggvhwuaaubkosymb.supabase.co',
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9mY3hnZ3Zod3VhYXVia29zeW1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ4NjY1MzEsImV4cCI6MjAwMDQ0MjUzMX0.PAPtF9H2Gt4oSTPouMq65JUr39cI1t5QziP5S7q7PcM'
);
