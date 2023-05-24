import React, { useState } from 'react';
import { setErrorMessage } from '../../action';
import { useDispatch } from 'react-redux';
import { changePassword } from './action';

const ChangePassword = () => {
  const dispatch = useDispatch();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setErrorMessage('New password and confirm password do not match.');
      return;
    }
    if (newPassword.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return;
    }
    dispatch(changePassword(currentPassword, newPassword, confirmPassword));
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="wrapper">
      <div className="registration_form" style={{ marginBottom: '10%' }}>
        <form onSubmit={handleSubmit}>
          <div className="form_wrap">
            <div className="text-center mb-4">
              <h3>Change Password</h3>
            </div>
            <div className="input_wrap">
              <label>Current Password</label>
              <input
                type="password"
                name=""
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>

            <div className="input_wrap">
              <label>New Password</label>
              <input
                type="password"
                name=""
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <div className="input_wrap">
              <label>Change Password</label>
              <input
                type="password"
                name=""
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
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
                Update password
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
