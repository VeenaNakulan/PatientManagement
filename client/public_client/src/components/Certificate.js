import React, { useState } from 'react';
import Web3 from 'web3';
import consultationCertificateVerificationFunction from '../blockchain/certificateVerificationFunction';
import certificateVerificationFunction from '../blockchain/vaccinationCertificateVerify';
// import Modal from './Modal';
import Modals from './Modal';
import VaccineModal from './VaccineModal';

const Certificate = () => {
  const [certificateNumber, setCertificateNumber] = useState('');
  const [vaccineCert, setVaccineCert] = useState('');
  const [open, setopen] = useState({ status: false, data: {} });
  const [vacOpen, setVacOpen] = useState({ status: false, data: {} });

  // verify consultation certificate
  const verifyConsultation = async (e) => {
    e.preventDefault();
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts();

    const consulCertData = await consultationCertificateVerificationFunction({
      web3,
      certificateNumber,
    });
    setopen({ status: true, data: consulCertData });
  };
  // verify vaccineation certificate

  const handleCertificateNumberChange = (e) => {
    setCertificateNumber(e.target.value);
  };

  const verifyVaccination = async (e) => {
    e.preventDefault();
    const web3 = new Web3(window.ethereum);
    await window.ethereum.enable();
    const accounts = await web3.eth.getAccounts();

    const vaccCert = await certificateVerificationFunction({
      web3,
      certificateNumber: vaccineCert,
    });
    setVacOpen({ status: true, data: vaccCert });
  };

  const handleVaccinationChange = (e) => {
    setVaccineCert(e.target.value);
  };

  return (
    <div id="certificate" className="p-5 mt-5 mb-5">
      <Modals open={open} close={() => setopen({ status: false, data: {} })} />;
      <VaccineModal
        open={vacOpen}
        close={() => setVacOpen({ status: false, data: {} })}
      />
      <div className="text-center text-green">
        <h2 className="text-decoration-underline">CERTIFICATE</h2>
      </div>
      <form className="form-search" onSubmit={verifyVaccination}>
        <div className="mt-5">
          <h6 className="fw-bold">Verify vaccine certification</h6>
        </div>
        <input
          className="mt-3"
          type="search"
          name="search"
          placeholder="search your certificate no.."
          onChange={handleVaccinationChange}
          value={vaccineCert}
        />
        <button type="submit">Search</button>
      </form>
      <form className="form-search" onSubmit={verifyConsultation}>
        <div className="mt-5">
          <h6 className="fw-bold">Verify consultation certificate</h6>
        </div>
        <input
          className="mt-3"
          type="search"
          name="search"
          placeholder="search your certificate no.."
          value={certificateNumber}
          onChange={handleCertificateNumberChange}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default Certificate;
