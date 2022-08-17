import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initToaster: VoidFunction = () => {
	toast.configure({
		autoClose: 6000,
		hideProgressBar: true,
	});
};

export default initToaster;
