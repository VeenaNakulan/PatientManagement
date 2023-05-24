import React from 'react';
import Modal from 'react-modal';

const Modals = ({ open, close }) => {
  return (
    <div>
      <Modal isOpen={open.status} ariaHideApp={false}>
        <h3>Consultation</h3>
        <p>CertificateNumber:{open.data.certificatenumber}</p>
        <p>TIme:{open.data.consultationTime}</p>
        <p>Department:{open.data.departmentName}</p>
        <p>Doctor:{open.data.doctorName}</p>
        <p>Hospital:{open.data.hospitalName}</p>
        <p>IssueDate:{open.data.issuedDateTime}</p>
        <p>IssueId:{open.data.issuerId}</p>
        <p>IssueName:{open.data.issuerName}</p>
        <p>Patient:{open.data.patientName}</p>
        <p>PatientRegId:{open.data.patientRegId}</p>
        <p>PatientUUID:{open.data.patientUUID}</p>
        <button className="login-button" onClick={close}>
          Close
        </button>
      </Modal>
    </div>
  );
};

export default Modals;
