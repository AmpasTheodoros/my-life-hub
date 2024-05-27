// pages/index.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../utils/supabaseClient';

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const user = supabase.auth.user();
    if (user) {
      setEmail(user.email);
    }
    setLoading(false);
  }, []);

  const handleLogout = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error logging out:', error);
    } else {
      router.push('/signin');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ maxWidth: '520px', margin: 'auto', padding: '20px' }}>
      <h2>Welcome, {email}</h2>
      <button onClick={handleLogout} disabled={loading}>
        Logout
      </button>
    </div>
  );
}

export async function getServerSideProps({ req }) {
  const { user } = await supabase.auth.session();

  if (!user) {
    // If no user, redirect to login
    return { props: {}, redirect: { destination: '/signin', permanent: false } };
  }

  // If there is a user, return the user as props
  return { props: { user } };
}