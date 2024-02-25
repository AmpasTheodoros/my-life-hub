import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleLogin = async (email) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOtp({ email });
      if (error) throw error;
      setMessage('Check your email for the login link!');
    } catch (error) {
      setMessage(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '420px', margin: 'auto', padding: '20px', textAlign: 'center' }}>
      <h2>Sign In</h2>
      <p>Please enter your email address to receive a sign-in link:</p>
      <div>
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            handleLogin(email);
          }}
          disabled={loading}
          style={{ width: '100%', padding: '8px' }}
        >
          {loading ? 'Sending...' : 'Send magic link'}
        </button>
      </div>
      {message && <p style={{ marginTop: '20px' }}>{message}</p>}
    </div>
  );
}