import {authStore} from '@/src/entities/auth/model';
import type {AppProps} from 'next/app';
import {Inter} from 'next/font/google';
import {GoogleOAuthProvider} from '@react-oauth/google';
import {GOOGLE_CLIENT_ID} from '@/src/shared/config';
import Layout from '@/src/shared/ui/Layout';

import '@/src/styles/globals.scss';
import {useContext, useEffect} from 'react';

const inter = Inter({subsets: ['latin']});

export default function App({Component, pageProps}: AppProps) {
    const {checkAuth, setLoading, isPersist} = useContext(authStore);

    useEffect(() => {
        isPersist ? checkAuth() : setLoading(false);
    }, []);

    return (
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            <Layout fonts={inter}>
                <Component {...pageProps} />
            </Layout>
        </GoogleOAuthProvider>
    );
}
