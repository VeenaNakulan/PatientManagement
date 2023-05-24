import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Web3 from 'web3';
import { setErrorMessage } from '../../action';
import { getHospitaldetails } from '../consultation/action';
import { getVaccineList, postVaccine } from './action';
import { schema } from './validation';

const Vaccination = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    date: '',
    hospitalId: '',
    vaccineId: '',
  });

  const [errors, setErrors] = useState({});
  const { hospitaldata } = useSelector((state) => state.hospitalReducer);
  const { vaccinelist } = useSelector((state) => state.vaccineReducer);

  console.log(vaccinelist);

  useEffect(() => {
    dispatch(getHospitaldetails());
    dispatch(getVaccineList());
  }, []);

  const validateField = (name, value) => {
    const { error } = schema.extract(name).validate(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error ? error.message : null,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = schema.validate(formData, {
      abortEarly: false,
    });
    if (error) {
      const newErrors = {};
      error.details.forEach((err) => {
        newErrors[err.path[0]] = err.message;
      });
      setErrors((prevState) => ({ ...prevState, ...newErrors }));
    } else {
      try {
        // Meatamask transation
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();

        const tokenAddress = '0xaF7b3E7f0EE7b38E5844a5790CC87d992AAab514';

        const toWei = async (web3, amount, decimals) => {
          return await web3.utils.toWei(
            parseFloat(amount).toFixed(decimals).toString(),
            'ether'
          );
        };

        const getGasPrice = async (web3) => {
          const gasPrice = await web3.eth.getGasPrice();
          return web3.utils.toBN(gasPrice).add(web3.utils.toBN('20000000000'));
        };

        const AmountInWei = await toWei(web3, 0, 18);
        const GetGasPricesss = await getGasPrice(web3);

        const result = await web3.eth.sendTransaction({
          from: accounts[0],
          to: tokenAddress,
          value: AmountInWei,
          GetGasPricesss,
        });

        if (result) {
          dispatch(postVaccine(formData, result));
          setFormData({
            date: '',
            hospitalId: '',
            vaccineId: '',
          });
        }
      } catch (error) {
        if (error.code === 4001) {
          dispatch(
            setErrorMessage(
              ' MetaMask transaction rejected. Your booking is cancelled'
            )
          );
        }
      }
    }
  };

  //date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const dd = String(tomorrow.getDate()).padStart(2, '0');
  const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
  const yyyy = tomorrow.getFullYear();

  const minDate = `${yyyy}-${mm}-${dd}`;

  // const today = new Date().toISOString().split('T')[0];

  return (
    <div className="wrapper">
      <div className="registration_form" style={{ marginBottom: '10%' }}>
        <form onSubmit={handleSubmit}>
          <div className="form_wrap">
            <div className="text-center mb-4">
              <h3>Consultation</h3>
            </div>
            <div className="input_wrap">
              <label>Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                min={minDate}
              />
              {errors.date && (
                <span className="text-danger">{errors.date}</span>
              )}
            </div>

            <div className="input_wrap">
              <label>Hospital</label>
              <select
                name="hospitalId"
                value={formData.hospitalId}
                onChange={handleChange}
              >
                <option>--select--</option>
                {hospitaldata.hospitalData?.map((h, index) => (
                  <option key={index} value={h._id}>
                    {h.hospitalName}
                  </option>
                ))}
              </select>
              {errors.hospitalId && (
                <span className="text-danger">{errors.hospitalId}</span>
              )}
            </div>

            <div className="input_wrap">
              <label>Vaccine</label>
              <select
                name="vaccineId"
                value={formData.vaccineId}
                onChange={handleChange}
              >
                <option>--select--</option>
                {vaccinelist?.map((v, index) => (
                  <option key={index} value={v._id}>
                    {v.name}
                  </option>
                ))}
              </select>
              {errors.vaccineId && (
                <span className="text-danger">{errors.vaccineId}</span>
              )}
            </div>

            <div className="input_wrap">
              <button
                type="submit"
                className="btn btn-sm  w-full w-lg-auto mt-4 p-2"
                style={{
                  backgroundColor: '#6d7119',
                  color: 'white',
                  width: '100%',
                }}
              >
                Register
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Vaccination;
