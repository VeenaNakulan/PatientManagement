import { useDispatch, useSelector } from 'react-redux';
import { resetErrorMessage, resetSuccessMessage } from '../action';
import Header from './Header';
import Homepage from './Homepage';
import { Slide, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';

const toastConfig = {
  position: 'top-right',
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'colored',
};

const App = () => {
  const dispatch = useDispatch();
  const { successMessage, errorMessage } = useSelector(
    (state) => state.commonReducer
  );
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage, toastConfig);
      dispatch(resetSuccessMessage());
    } else if (errorMessage) {
      toast.error(errorMessage, toastConfig);
      dispatch(resetErrorMessage());
    }
  }, [successMessage, errorMessage]);
  return (
    <div className="App">
      <ToastContainer transition={Slide} />
      <Header />
      <Homepage />
    </div>
  );
};

export default App;
