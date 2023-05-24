import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  getHospitaldetails,
  corespondingHospitalData,
  corespondingDepartmentData,
  getTimedata,
  postConsultation,
} from './action';

import { schema } from './validation';
import Web3 from 'web3';
import { setErrorMessage } from '../../action';

const Consultaion = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    date: '',
    hospitalId: '',
    departmentId: '',
    doctorId: '',
    time: '',
  });

  const [errors, setErrors] = useState({});

  const { hospitaldata, eachData, timedata } = useSelector(
    (state) => state.hospitalReducer
  );
  useEffect(() => {
    dispatch(getHospitaldetails());
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

    if (name === 'hospitalId') {
      dispatch(corespondingHospitalData(value));
    }
    if (name === 'departmentId') {
      dispatch(corespondingDepartmentData(formData.hospitalId, value));
    }
    if (name === 'date') {
      dispatch(getTimedata({ doctorId: formData.doctorId, date: value }));
    }
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
          dispatch(postConsultation(formData, result, navigate));
          setFormData({
            date: '',
            hospitalId: '',
            departmentId: '',
            doctorId: '',
            time: '',
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

  // date format
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
            <div className="input_grp d-flex flex-wrap justify-content-between">
              <div className="input_wrap">
                <label>Hospital</label>
                <select
                  name="hospitalId"
                  value={formData.hospitalId}
                  onChange={handleChange}
                >
                  <option>--select--</option>
                  {hospitaldata?.hospitalData?.map((h) => (
                    <option key={h.hospitalId} value={h.hospitalId}>
                      {h.hospitalName}
                    </option>
                  ))}
                </select>
                {errors.hospitalId && (
                  <span className="text-danger">{errors.hospitalId}</span>
                )}
              </div>

              <div className="input_wrap">
                <label>Department</label>
                <select
                  name="departmentId"
                  value={formData.departmentId}
                  onChange={handleChange}
                >
                  <option>--select--</option>
                  {hospitaldata?.departmentData?.map((d) => (
                    <option key={d.departmentId} value={d.departmentId}>
                      {d.departmentName}
                    </option>
                  ))}
                </select>
                {errors.departmentId && (
                  <span className="text-danger">{errors.departmentId}</span>
                )}
              </div>

              <div className="input_wrap">
                <label>Doctor</label>
                <select
                  name="doctorId"
                  value={formData.doctorId}
                  onChange={handleChange}
                >
                  <option>--select--</option>
                  {eachData?.doctorData?.map((d, index) => (
                    <option key={index} value={d._id}>
                      {d.doctorName}
                    </option>
                  ))}
                </select>
                {errors.doctorId && (
                  <span className="text-danger">{errors.doctorId}</span>
                )}
              </div>
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
              <label>Time</label>
              <select name="time" value={formData.time} onChange={handleChange}>
                <option>--select--</option>
                {timedata?.map((timeSlot, index) => (
                  <option key={index} value={timeSlot.time}>
                    {timeSlot.time}
                  </option>
                ))}
              </select>
              {errors.time && (
                <span className="text-danger">{errors.time}</span>
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

export default Consultaion;
