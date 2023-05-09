import {toast} from 'react-toastify';

type ToastBodyProps = {
    message: string;
};

const ToastBody = ({message}: ToastBodyProps) => (
    <div className="px-2">
        <h4 className="text-sm">{message}</h4>
    </div>
);

export const throwErrorToast = (message: string) => {
    toast.error(<ToastBody message={message} />);
};

export const throwSuccessToast = (message: string) => {
    toast.success(<ToastBody message={message} />);
};
