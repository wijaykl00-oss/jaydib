import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vqngkagevliaejmxsklv.supabase.co';
const supabaseAnonKey = 'sb_publishable_ScXzMEFpNqctwaV_1INILA_0Jr2_wnv';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function listFiles() {
  const { data, error } = await supabase.storage.from('payments').list('receipts');
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Total files in receipts:', data.length);
    console.log('Files:', JSON.stringify(data.slice(0, 10), null, 2));
  }
}

listFiles();
