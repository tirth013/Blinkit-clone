import { toast } from 'react-hot-toast';

const AxiosToastError = (error) => {
  const message = error?.response?.data?.message || error?.message || 'An error occurred';
  toast.error(message);
};

export default AxiosToastError;