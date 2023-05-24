import React, { useEffect, useState } from 'react';
import { geteachUser } from '../consultation/action';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from 'react-data-table-component';

const Patients = () => {
  const dispatch = useDispatch();
  const { eachUser } = useSelector((state) => state.adminReducer);
  const [filteredData, setFilteredData] = useState(eachUser); // State for filtered data

  // Define columns
  const columns = [
    {
      name: 'Name',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: 'PhoneNumber',
      selector: (row) => row.phoneNumber,
      sortable: true,
    },
    {
      name: 'Aadhar',
      selector: (row) => row.aadharNo,
      sortable: true,
    },
    {
      name: 'DOB',
      selector: (row) => {
        const date = new Date(row.dob);
        const dateOnly = date.toLocaleDateString();
        return dateOnly;
      },
      sortable: true,
    },
    {
      name: 'Address',
      selector: (row) => row.address,
      sortable: true,
    },
  ];

  useEffect(() => {
    dispatch(geteachUser());
  }, []);

  // Function to handle filtering based on search input
  const handleFilter = (e) => {
    const searchText = e.target.value.toLowerCase();
    const filteredResult = eachUser.filter((user) => {
      const name = user.name ? user.name.toLowerCase() : '';
      const phoneNumber = user.phoneNumber ? user.phoneNumber : '';
      const aadharNo = user.aadharNo ? user.aadharNo : '';
      const address = user.address ? user.address.toLowerCase() : '';

      const date = new Date(user.dob);
      const formattedDate = `${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()}`;

      return (
        name.includes(searchText) ||
        phoneNumber.includes(searchText) ||
        aadharNo.includes(searchText) ||
        address.includes(searchText) ||
        formattedDate.includes(searchText)
      );
    });
    setFilteredData(filteredResult);
  };

  return (
    <div className="container mt-5">
      <div className="border border-dark" style={{ padding: '6%' }}>
        <h3 className="mb-5 text-center">Patient</h3>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search..."
            onChange={handleFilter}
          />
        </div>
        <DataTable
          columns={columns}
          data={filteredData} // Use filteredData instead of eachUser
          pagination
          paginationPerPage={10}
        />
      </div>
    </div>
  );
};

export default Patients;
