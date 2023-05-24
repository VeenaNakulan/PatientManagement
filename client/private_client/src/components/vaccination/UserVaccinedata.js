import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEachVaccineData } from './action';
import DataTable from 'react-data-table-component';

const UserVaccinedata = () => {
  const dispatch = useDispatch();
  const { eachVaccineData } = useSelector((state) => state.vaccineReducer);

  useEffect(() => {
    dispatch(getEachVaccineData());
  }, []);

  const columns = [
    {
      name: 'Hospital',
      selector: (row) => row.hospitalId?.hospitalName,
    },
    {
      name: 'Vaccine',
      selector: (row) => row.vaccineId?.name,
    },
    {
      name: 'Date',
      selector: (row) => {
        const date = new Date(row.date);
        const dateOnly = date.toLocaleDateString();
        return dateOnly;
      },
    },
  ];
  return (
    <div>
      {' '}
      <h3>Vaccination</h3>
      <DataTable columns={columns} data={eachVaccineData} />
    </div>
  );
};

export default UserVaccinedata;
