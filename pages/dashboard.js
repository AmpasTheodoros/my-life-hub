import { supabase } from '../utils/supabaseClient';

export async function getServerSideProps(context) {
    const { req } = context;
    const { user } = await supabase.auth.api.getUserByCookie(req);

    if (!user) {
        return { props: {}, redirect: { destination: '/auth/signin', permanent: false } };
    }

    return { props: { user } };
}
