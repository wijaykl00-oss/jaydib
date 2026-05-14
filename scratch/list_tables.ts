import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vqngkagevliaejmxsklv.supabase.co';
const supabaseAnonKey = 'sb_publishable_ScXzMEFpNqctwaV_1INILA_0Jr2_wnv';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function listTables() {
  // Try to query common table names to see if they exist
  const tables = ['transactions', 'orders', 'payments', 'history', 'logs'];
  for (const table of tables) {
    const { data, error } = await supabase.from(table).select('*').limit(1);
    if (!error) {
      console.log(`Table '${table}' exists and has data:`, data.length > 0);
    } else if (error.code !== 'PGRST116' && error.code !== '42P01') {
       // 42P01 is relation does not exist
       console.log(`Table '${table}' error:`, error.code, error.message);
    }
  }
}

listTables();
