import {Container} from '@/src/shared/ui/Container';
import {Content} from '@/src/shared/ui/Content';

export const HomePage = () => {
    return (
        <Container>
            <Content className="h-screen flex items-center justify-center">
                <div className="max-w-md sm:max-w-xl lg:max-w-3xl xl:max-w-4xl">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-center font-semibold xl:leading-tight">
                        Learn how to build and grow one-person business
                    </h1>
                </div>
            </Content>
        </Container>
    );
};
