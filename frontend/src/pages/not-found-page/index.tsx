import {Container} from '@/src/shared/ui/Container';
import {Content} from '@/src/shared/ui/Content';

export const NotFoundPage = () => {
    return (
        <Container>
            <Content className="h-screen flex items-center justify-center">
                <div className="max-w-md sm:max-w-xl lg:max-w-3xl xl:max-w-4xl">
                    <h1 className="text-8xl sm:text-9xl lg:text-ul xl:text-gl text-center font-semibold xl:leading-tight">
                        404
                    </h1>
                </div>
            </Content>
        </Container>
    );
};
