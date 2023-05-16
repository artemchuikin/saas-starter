import {authStore} from '@/src/entities/auth/model';
import {Container} from '@/src/shared/ui/Container';
import {observer} from 'mobx-react-lite';
import {useRouter} from 'next/router';
import {useContext, useEffect} from 'react';

export const DashboardPage = observer(() => {
    const router = useRouter();
    const {isAuth, isLoading} = useContext(authStore);

    useEffect(() => {
        if (!isLoading && !isAuth) router.push('/');
    }, [isLoading, isAuth])

    return (
        <Container>
            <h1 className="pt-48 text-3xl font-semibold transition-color duration-200">
                Dashboard
            </h1>
        </Container>
    );
});
