import axios from 'axios';
import { useState, useEffect } from 'react';

import { Table } from '@/components/ui/table';

import { useMaterial } from '../api/get-material';

const MaterialTable = () => {
  // hooks React akan mengubah tampilan berdasarkan perubahan state,
  const [result, setResult] = useState(0);
  const add = () => {
    setResult(result + 1);
    console.log(result);
  };

  //sedangkan variable biasa tidak akan menyebabkan re-render
  const resultnonState = 0;
  const addnonState = () => {
    resultnonState + 1;
    console.log(resultnonState);
  };

  // fetch data material tanpa react-query
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:1337/api/material', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });

        setData(response.data);
        console.log('Material Data:', response.data);
      } catch (error) {
        console.error('Error fetching material data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this runs once on mount

  useEffect(() => {
    alert(`Result state changed: ${result}`);
  }, [result]);

  return (
    //react fragm
    <div>
      <div>
        <h1>React State</h1>
        <div>{result}</div>
        <button onClick={add}>Add</button>
      </div>
      <div>
        <h1>Variable</h1>
        <div>{resultnonState}</div>
        <button onClick={addnonState}>Add</button>
      </div>
    </div>
  );
};

export default MaterialTable;
