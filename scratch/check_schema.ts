import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vqngkagevliaejmxsklv.supabase.co';
const supabaseAnonKey = 'sb_publishable_ScXzMEFpNqctwaV_1INILA_0Jr2_wnv';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkSchema() {
  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .limit(1);

  if (error) {
    console.error('Error:', error);
  } else if (data.length > 0) {
    console.log('Columns:', Object.keys(data[0]));
  } else {
    console.log('No data to check schema.');
  }
}

checkSchema();
