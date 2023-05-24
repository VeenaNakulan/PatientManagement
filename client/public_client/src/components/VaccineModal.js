import React from 'react';
import Modal from 'react-modal';

const VaccineModal = ({ open, close }) => {
  return (
    <div>
      <Modal isOpen={open.status} ariaHideApp={false}>
        <h3>Vaccination</h3>
        <p>CertificateNumber:{open.data.certificatenumber}</p>
        <p>Date:{open.data.vaccineTakenDatetime}</p>
        <p>Vaccine:{open.data.vaccineName}</p>
        <p>Disease:{open.data.disease}</p>
        <p>Antigen:{open.data.antigen}</p>
        <p>IssueID:{open.data.issuerId}</p>
        <p>IssueName:{open.data.issuerName}</p>
        <p>PatientName:{open.data.patientName}</p>
        <p>PatientRegId:{open.data.patientRegId}</p>
        <p>PatientUUID:{open.data.patientUUID}</p>
        <button className="login-button" onClick={close}>
          Close
        </button>
      </Modal>
    </div>
  );
};

export default VaccineModal;
