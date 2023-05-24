import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from 'react-data-table-component';
import { getTransactions } from './action';

const Transaction = () => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');
  const { transactions } = useSelector((state) => state.adminReducer);

  console.log(transactions);

  useEffect(() => {
    dispatch(getTransactions());
  }, []);

  // Define colums
  const columns = [
    {
      name: 'Name',
      selector: (row) => row.signupData[0].name,
      sortable: true,
    },
    {
      name: 'Phone',
      selector: (row) => row.signupData[0].phoneNumber,
      sortable: true,
    },
    {
      name: 'Type',
      selector: (row) => row.appointmentType,
      sortable: true,
    },
    {
      name: 'Amount',
      selector: (row) => row.amount,
      sortable: true,
    },
  ];

  return (
    <div className="container mt-5">
      <div className="border border-dark" style={{ padding: '6%' }}>
        <h3 className="mb-5 text-center">Transactions</h3>
        {/* <div className="mb-5">
          <input
            type="text"
            className="form-control"
            placeholder="Search here"
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div> */}
        <div className="mt-3">
          <DataTable
            columns={columns}
            data={transactions}
            onSearch={(text) => setSearchText(text)}
            pagination
            paginationPerPage={10} // Number of rows per page
          />
        </div>
      </div>
    </div>
  );
};

export default Transaction;
