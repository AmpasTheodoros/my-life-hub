import { useState } from 'react';
import { supabase } from '../utils/supabaseClient';

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignUp = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');

    const { user, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage('Check your email for the confirmation link.');
      // Here you can handle redirection to another page if needed
    }

    setLoading(false);
  };

  return (
    <div style={{ maxWidth: '520px', margin: 'auto', padding: '20px' }}>
      <h2>Sign Up</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSignUp}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit" disabled={loading}>
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </div>
      </form>
    </div>
  );
}