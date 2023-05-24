import React, { useEffect, useState } from 'react';
import { CertificateCreation, getConsultResult, geteachUser } from './action';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from 'react-data-table-component';
import Web3 from 'web3';
import IssueConsultation from '../../blockChain/IssueConsultation';
import { setErrorMessage } from '../../../action';
import SyncLoader from 'react-spinners/SyncLoader';

const AdminConsultation = () => {
  const dispatch = useDispatch();
  const { listConsult, eachUser } = useSelector((state) => state.adminReducer);
  const { loader } = useSelector((state) => state.commonReducer);

  const [filteredConsult, setFilteredConsult] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  useEffect(() => {
    dispatch(getConsultResult());
    dispatch(geteachUser());
  }, []);

  useEffect(() => {
    setFilteredConsult(listConsult);
  }, [listConsult]);

  // generateCertificate

  const handleCertificateIssue = async (item) => {
    try {
      console.log('item', item);
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();
      const address = accounts[0];
      const validUser = eachUser?.find((e) => e.loginId === item.loginId);
      const decodedData = await IssueConsultation({
        web3,
        address,
        values: {
          patientName: validUser.name,
          patientUUID: validUser.aadharNo,
          patientRegId: validUser.loginId,
          doctorName: item.doctorId.doctorName,
          consultationTime: new Date(
            `${item.date.slice(0, 10)} ${
              item.date.slice(0, 2) + ':' + item.date.slice(3, 5) + ':00'
            }`
          ).getTime(),
          departmentName: item.departmentId.departmentName,
          hospitalName: item.hospitalId.hospitalName,
          issuerName: item.hospitalId.hospitalName,
          issuerId: item.hospitalId._id.slice(0, 32),
          issuedDateTime: new Date().getTime(),
        },
      });
      console.log(decodedData);
      dispatch(CertificateCreation(decodedData));
    } catch (err) {
      dispatch(setErrorMessage(err.message));
    }
  };

  const handleSearch = (e) => {
    setSearchValue(e.target.value.toLowerCase());
    applyFilters(e.target.value.toLowerCase(), dateFilter);
  };

  const handleDateFilter = (e) => {
    const selectedDate = e.target.value;
    setDateFilter(selectedDate);
    applyFilters(searchValue, selectedDate);
  };

  const applyFilters = (searchText, selectedDate) => {
    const filteredData = listConsult.filter((row) => {
      const rowDate = new Date(row.date);
      const rowDateOnly = `${rowDate.getDate()}/${
        rowDate.getMonth() + 1
      }/${rowDate.getFullYear()}`;

      const searchTextMatch =
        row.hospitalId?.hospitalName.toLowerCase().includes(searchText) ||
        row.departmentId?.departmentName.toLowerCase().includes(searchText) ||
        row.doctorId?.doctorName.toLowerCase().includes(searchText) ||
        row.status.toLowerCase().includes(searchText);

      const selectedDateOnly = new Date(selectedDate);
      const formattedSelectedDate = `${selectedDateOnly.getDate()}/${
        selectedDateOnly.getMonth() + 1
      }/${selectedDateOnly.getFullYear()}`;

      const dateMatch =
        selectedDate === '' || rowDateOnly === formattedSelectedDate;

      return searchTextMatch && dateMatch;
    });

    setFilteredConsult(filteredData);
  };

  // Define colums
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
    {
      name: 'Status',
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: 'Action',
      selector: (row) => {
        return (
          <button
            className="btn btn-outline-success btn-sm"
            onClick={() => handleCertificateIssue(row)}
          >
            Issue Certificate
          </button>
        );
      },
    },
  ];

  return (
    <div className="container mt-5">
      <div className="border border-dark" style={{ padding: '6%' }}>
        <h3 className="mb-5 text-center">Consultation List</h3>
        <div className="mb-3">
          <input
            type="text"
            placeholder="Search"
            className="form-control"
            value={searchValue}
            onChange={handleSearch}
          />
        </div>
        <div className="mb-3">
          <input
            type="date"
            className="form-control"
            value={dateFilter}
            onChange={handleDateFilter}
          />
        </div>
        {loader ? (
          <div className="m-auto">
            <SyncLoader color="#5f621f" />
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={filteredConsult}
            pagination
            paginationPerPage={10}
          />
        )}
      </div>
    </div>
  );
};

export default AdminConsultation;
