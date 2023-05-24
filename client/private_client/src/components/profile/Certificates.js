import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from 'react-data-table-component';
import { getCertificate } from './action';

const Certificates = () => {
  const dispatch = useDispatch();
  const { certificatelist } = useSelector((state) => state.profileReducer);

  const consult = certificatelist?.consultData;
  const vaccines = certificatelist?.vaccinData;

  useEffect(() => {
    dispatch(getCertificate());
  }, []);

  const columns = [
    {
      name: 'Certificate Number',
      selector: (row) => row.certificateNumber,
      sortable: true,
    },
    {
      name: 'Hospital',
      selector: (row) => row.hospitalName,
      sortable: true,
    },
    {
      name: 'Department',
      selector: (row) => row.departmentName,
      sortable: true,
    },
    {
      name: 'Doctor',
      selector: (row) => row.doctorName,
      sortable: true,
    },
    {
      name: 'Patient UUID',
      selector: (row) => row.patientUUID,
      sortable: true,
    },
  ];
  const vaccinCode = [
    {
      name: 'Certificate Number',
      selector: (row) => row.patientName,
      sortable: true,
    },
    {
      name: 'Disease',
      selector: (row) => row.disease,
      sortable: true,
    },
    {
      name: 'Antigen',
      selector: (row) => row.antigen,
      sortable: true,
    },
    {
      name: 'Vaccine',
      selector: (row) => row.vaccineName,
      sortable: true,
    },
    {
      name: 'Patient UUID',
      selector: (row) => row.patientUUID,
      sortable: true,
    },
  ];
  return (
    <div className="container mt-5 m-auto">
      <div className="row">
        <div className="col-md-4 col-lg-6 p-5 userProfile mb-3">
          <h3 className="text-center mb-3">Consultaion Certificate</h3>
          <DataTable
            columns={columns}
            data={consult}
            pagination
            paginationPerPage={10}
          />
        </div>
        <div className="col-md-4 col-lg-6 p-5 mb-3 userProfile mb-3">
          <h3 className="text-center mb-3">Vaccination Certificate</h3>
          <DataTable
            columns={vaccinCode}
            data={vaccines}
            pagination
            paginationPerPage={10}
          />
        </div>
      </div>
    </div>
  );
};

export default Certificates;
