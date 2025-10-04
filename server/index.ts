import express from 'express';
import { createClient } from '@supabase/supabase-js';

const app = express();
const PORT = process.env.PORT || 3000;

// Supabase setup
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

app.use(express.json());

// ✅ Homepage
app.get('/', (req, res) => {
  res.json({ 
    status: 'online',
    message: '🚀 Big Gimmy API is running!',
    endpoints: ['/api/test', '/api/products']
  });
});

// ✅ Test database
app.get('/api/test', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('count')
      .limit(1);
    
    if (error) throw error;
    
    res.json({ 
      status: 'ok',
      database: 'connected',
      supabaseUrl: process.env.SUPABASE_URL 
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'error',
      message: error.message 
    });
  }
});

// ✅ API prodotti
app.get('/api/products', async (req, res) => {
  const { data, error } = await supabase
    .from('products')
    .select('*');
  
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// ✅ 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    availableRoutes: ['/', '/api/test', '/api/products']
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`🗄️ Supabase URL: ${process.env.SUPABASE_URL || 'NOT SET'}`);
});