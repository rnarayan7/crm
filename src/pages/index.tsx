import React from 'react';
import PersonForm from '@/components/PersonForm';
import NoteForm from '@/components/NoteForm';

const Home: React.FC = () => {
  return (
    <div>
      <h1>AI Powered Personal CRM</h1>
      <PersonForm />
      <NoteForm />
    </div>
  );
};

export default Home;
