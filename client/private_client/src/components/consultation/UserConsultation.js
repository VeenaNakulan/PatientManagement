import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getConsultaion } from './action';
import DataTable from 'react-data-table-component';

const UserConsultation = () => {
  const dispatch = useDispatch();
  const { consultationlist } = useSelector((state) => state.hospitalReducer);

  const columns = [
    {
      name: 'Hospital',
      selector: (row) => row.hospitalId?.hospitalName,
      sortable: true,
    },
    {
      name: 'Department',
      selector: (row) => row.departmentId?.departmentName,
      sortable: true,
    },
    {
      name: 'Doctor',
      selector: (row) => row.doctorId?.doctorName,
      sortable: true,
    },
    {
      name: 'Date',
      selector: (row) => {
        const date = new Date(row.date);
        const dateOnly = date.toLocaleDateString();
        return dateOnly;
      },
      sortable: true,
    },
    {
      name: 'Time',
      selector: (row) => row.time,
      sortable: true,
    },
  ];

  useEffect(() => {
    dispatch(getConsultaion());
  }, []);

  return (
    <div>
      <h3>Consultation</h3>
      <DataTable
        columns={columns}
        data={consultationlist}
        pagination
        paginationPerPage={10}
      />
    </div>
  );
};

export default UserConsultation;
