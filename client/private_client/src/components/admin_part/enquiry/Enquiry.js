import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from 'react-data-table-component';
import { DeleteMessages, PutMessages, getMessages } from './action';
import SyncLoader from 'react-spinners/SyncLoader';

const Enquiry = () => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');
  const { enquries } = useSelector((state) => state.adminReducer);
  const { loader } = useSelector((state) => state.commonReducer);

  useEffect(() => {
    dispatch(getMessages());
  }, []);

  const filteredData = enquries?.filter((item) => {
    return (
      item.name.toLowerCase().includes(searchText.toLowerCase()) ||
      item.message.toLowerCase().includes(searchText.toLowerCase()) ||
      item.email.toLowerCase().includes(searchText.toLowerCase())
    );
  });

  // Define colums
  const columns = [
    {
      name: 'Name',
      selector: (row) => row.name,
      sortable: true,
      filter: true,
    },
    {
      name: 'Email',
      selector: (row) => row.email,
      sortable: true,
      filter: true,
    },
    {
      name: 'Message',
      selector: (row) => row.message,
      sortable: true,
      filter: true,
    },
    {
      name: 'Status',
      selector: (row) => (
        <div>
          {row.status === 'unread' ? (
            <button
              className="btn btn-warning text-white btn-sm"
              onClick={() => dispatch(PutMessages(row._id))}
            >
              Unread
            </button>
          ) : (
            <button className="btn btn-warning text-white btn-sm">Read</button>
          )}
        </div>
      ),
      filter: true,
    },
    {
      name: 'Action',
      selector: (row) => (
        <button
          className="btn btn-danger btn-sm"
          onClick={() => dispatch(DeleteMessages(row._id))}
        >
          Delete
        </button>
      ),
    },
  ];

  return (
    <div className="container mt-5">
      <div className="border border-dark" style={{ padding: '6%' }}>
        <h3 className="mb-5 text-center">Enquiry</h3>
        <div className="mb-5">
          <input
            type="text"
            className="form-control"
            placeholder="Search here"
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        <div className="mt-3">
          {loader ? (
            <div className="m-auto">
              <SyncLoader color="#5f621f" />
            </div>
          ) : (
            <DataTable
              columns={columns}
              data={filteredData}
              onSearch={(text) => setSearchText(text)}
              pagination
              paginationPerPage={10} // Number of rows per page
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Enquiry;
