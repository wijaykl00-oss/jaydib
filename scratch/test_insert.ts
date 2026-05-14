import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vqngkagevliaejmxsklv.supabase.co';
const supabaseAnonKey = 'sb_publishable_ScXzMEFpNqctwaV_1INILA_0Jr2_wnv';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testInsert() {
  const testTrx = {
    id: 'TEST-' + Math.floor(Math.random() * 1000),
    name: 'Test User',
    product: 'Test Product',
    qty: 1,
    amount: 'Rp 1.000',
    date: '15 May 2026',
    status: 'Pending',
    proof_url: 'https://example.com/proof.jpg'
  };

  console.log('Inserting:', testTrx);
  const { data, error } = await supabase.from('transactions').insert([testTrx]);

  if (error) {
    console.error('Insert failed:', error);
  } else {
    console.log('Insert successful:', data);
  }
}

testInsert();
