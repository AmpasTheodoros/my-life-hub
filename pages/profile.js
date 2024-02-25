import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';

export default function Profile() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchUser();
    }, []);

    async function fetchUser() {
        try {
          setLoading(true);
          const { data: user, error } = await supabase.auth.user();
          if (error) {
            throw error;
          }
          const { data: userData, error: userError } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .limit(1)
            .single();
          if (userError) {
            throw userError;
          }
          setUser(userData);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      }

        async function updateProfile(event) {
            event.preventDefault();
            try {
              setLoading(true);
              const { data: user, error } = await supabase.auth.user();
              if (error) {
                throw error;
              }
              const updates = {
                id: user.id,
                email: user.email,
                password: event.target.password.value,
                updated_at: new Date(),
              };
              let { error: upsertError } = await supabase.from('users').upsert(updates, {
                returning: 'minimal', // Don't return the value after inserting
              });
              if (upsertError) {
                throw upsertError;
              }
            } catch (error) {
              alert(error.message);
            } finally {
              setLoading(false);
            }
          }

          if (!user) {
            console.log('User is null');
            return <div>Loading user...</div>;
          }
        
          console.log('User:', user);
        
        return (
            <div style={{ maxWidth: '520px', margin: 'auto', padding: '20px' }}>
            <h2>User Profile</h2>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            {/* Add a form to update the profile */}
            <form onSubmit={updateProfile}>
              <div>
                <label htmlFor="password">Password</label>
                <input id="password" type="password" defaultValue={user.password} />
              </div>
              <div>
                <button type="submit" disabled={loading}>
                  {loading ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        );
}