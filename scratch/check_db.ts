import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vqngkagevliaejmxsklv.supabase.co';
const supabaseAnonKey = 'sb_publishable_ScXzMEFpNqctwaV_1INILA_0Jr2_wnv';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkTransactions() {
  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching transactions:', error);
  } else {
    console.log('Total transactions found:', data.length);
    console.log('Latest 5 transactions:', JSON.stringify(data.slice(0, 5), null, 2));
  }
}

checkTransactions();
