import express from 'express';
import { createClient } from '@supabase/supabase-js';

const app = express();
const PORT = process.env.PORT || 3000;

// 🔥 Connessione Supabase
const supabaseUrl = process.env.SUPABASE_URL || 'https://xxx.supabase.co';
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'tua-anon-key';

const supabase = createClient(supabaseUrl, supabaseKey);

app.use(express.json());

// ✅ Test connessione database
app.get('/api/test', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('products') // Sostituisci con il nome della tua tabella
      .select('*')
      .limit(5);
    
    if (error) throw error;
    
    res.json({ 
      success: true, 
      message: '✅ Database connesso!',
      data 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
});

// 📝 API per leggere dati
app.get('/api/products', async (req, res) => {
  const { data, error } = await supabase
    .from('products')
    .select('*');
  
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// 📝 API per inserire dati
app.post('/api/products', async (req, res) => {
  const { data, error } = await supabase
    .from('products')
    .insert([req.body])
    .select();
  
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// 📝 API per aggiornare
app.put('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  
  const { data, error } = await supabase
    .from('products')
    .update(req.body)
    .eq('id', id)
    .select();
  
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// 📝 API per eliminare
app.delete('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);
  
  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running on port ${PORT}`);
});