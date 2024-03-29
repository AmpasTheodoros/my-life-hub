import { supabase } from '../../utils/supabaseClient';

export default async function handler(req, res) {
  const { data, error } = await supabase
    .from('User') 
    .select('*');

  if (error) {
    return res.status(401).json({ error: error.message });
  }

  return res.status(200).json(data);
}
