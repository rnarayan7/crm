import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '@/components/PersonTable.module.css';


interface Person {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const Table: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const response = await axios.get('/api/people');
        setPeople(response.data);
      } catch (error) {
        console.error('Error fetching people:', error);
      }
    };
    fetchPeople();
  }, []);

  return (
    <table className={styles.tableContainer}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {people.map((person) => (
          <tr key={person.id}>
            <td>{person.name}</td>
            <td>{person.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
