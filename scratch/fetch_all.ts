import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vqngkagevliaejmxsklv.supabase.co';
const supabaseAnonKey = 'sb_publishable_ScXzMEFpNqctwaV_1INILA_0Jr2_wnv';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function fetchAll() {
  const { data, error } = await supabase.from('transactions').select('*');
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Total records:', data.length);
    console.log('Records:', JSON.stringify(data, null, 2));
  }
}

fetchAll();
