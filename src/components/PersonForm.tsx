import React, { useState } from 'react';
import axios from 'axios';

const PersonForm: React.FC = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/person', {
        name,
        age: parseInt(age),
        email,
      });
      console.log('Person created:', response.data);
      setName('');
      setAge('');
      setEmail('');
    } catch (error) {
      console.error('Error creating person:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Person</h2>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="age">Age:</label>
        <input
          type="number"
          id="age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <button type="submit">Create Person</button>
    </form>
  );
};

export default PersonForm;
