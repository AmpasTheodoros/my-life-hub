import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';

export default function Profile() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchProfile();
    }, []);

    async function fetchProfile() {
        try {
            const { data: profileData, error } = await supabase.auth.getUser();
            if (error) {
                throw error;
            }
            if (profileData) {
                setProfile(profileData);
            }
            } catch (error) {
            console.error(error);
            }
        }

    async function updateProfile(event) {
        event.preventDefault();
        try {
        setLoading(true);
        const { data: user, error } = await supabase.auth.getUser();
        if (error) {
            throw error;
        }
        const updates = {
            id: user.id,
            username: event.target.username.value,
            website: event.target.website.value,
            avatar_url: event.target.avatar_url.value,
            updated_at: new Date(),
        };
        let { error: upsertError } = await supabase.from('profiles').upsert(updates, {
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

        if (!profile) {
            console.log('Profile is null');
            return <div>Loading profile...</div>;
        }
        
        console.log('Profile:', profile);
        
        return (
            <div style={{ maxWidth: '520px', margin: 'auto', padding: '20px' }}>
            <h2>User Profile</h2>
            <p><strong>Email:</strong> {profile.email}</p>
            {/* Add a form to update the profile */}
            <form onSubmit={updateProfile}>
                <div>
                <label htmlFor="username">Username</label>
                <input id="username" type="text" defaultValue={profile.username} />
                </div>
                <div>
                <label htmlFor="website">Website</label>
                <input id="website" type="url" defaultValue={profile.website} />
                </div>
                <div>
                <label htmlFor="avatar_url">Avatar URL</label>
                <input id="avatar_url" type="url" defaultValue={profile.avatar_url} />
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