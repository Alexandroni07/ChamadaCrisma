// src/supabase.js
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // ou anon key, se for leitura

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
