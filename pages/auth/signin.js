import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleLogin = async (email, password) => {
    try {
      setLoading(true);
      const { data: user, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .limit(1)
        .single();
      if (error) throw error;
      if (!user) throw new Error('User not found');
      const { password: hashedPassword } = user;
      const { error: signInError } = await supabase.auth.signIn({
        email,
        password,
      });
      if (signInError) throw signInError;
      setMessage('Logged in successfully!');
    } catch (error) {
      setMessage(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '420px', margin: 'auto', padding: '20px', textAlign: 'center' }}>
      <h2>Sign In</h2>
      <p>Please enter your email address and password to sign in:</p>
      <div>
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
        />
        <input
          type="password"
          placeholder="Your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            handleLogin(email, password);
          }}
          disabled={loading}
          style={{ width: '100%', padding: '8px' }}
        >
          {loading ? 'Logging in...' : 'Log in'}
        </button>
      </div>
      {message && <p style={{ marginTop: '20px' }}>{message}</p>}
      
    </div>
  );
}