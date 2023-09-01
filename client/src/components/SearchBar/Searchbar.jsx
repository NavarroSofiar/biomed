import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { getJobsFromDbByName } from '../../redux/actions/getJobName';

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');

  const handleInputChange = (e) => {
    setName(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getJobsFromDbByName(name));
  }

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      dispatch(getJobsFromDbByName(name));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search by name..."
        value={name}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <button type="submit">Search</button>
    </form>
  );
}
