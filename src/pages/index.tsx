import React from 'react';
import PersonForm from '@/components/PersonForm';
import NoteForm from '@/components/NoteForm';
import Table from '@/components/PersonTable';

const Home: React.FC = () => {
  return (
    <div>
      <h1>AI Powered Personal CRM</h1>
      <PersonForm />
      <NoteForm />
      <Table />
    </div>
  );
};

export default Home;
