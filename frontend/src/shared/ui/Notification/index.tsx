import CloseSvg from '@/public/icons/times-o.svg';
import {ThemeModeProps} from '@/src/shared/hooks/useThemeMode';
import {Slide, ToastContainer} from 'react-toastify';

export type NotificationProps = {
    themeMode?: ThemeModeProps;
};

export const Notification = ({themeMode}: NotificationProps) => {
    return (
        <ToastContainer
            toastClassName={`${
                themeMode === 'dark' ? 'bg-dark' : 'bg-white'
            } relative flex px-2 pt-2 pb-3 m-2 rounded-lg justify-between overflow-hidden cursor-pointer font-normal`}
            closeButton={
                <>
                    <CloseSvg className="mt-2 mr-2 w-4 h-4 opacity-70" />
                </>
            }
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            transition={Slide}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable={false}
            pauseOnHover={false}
            theme={themeMode}
        />
    );
};
