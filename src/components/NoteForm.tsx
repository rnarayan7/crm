import React, { useState } from 'react';
import axios from 'axios';

const NoteForm: React.FC = () => {
  const [personId, setPersonId] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/note', {
        person_id: personId,
        content,
      });
      console.log('Note created:', response.data);
      setPersonId('');
      setContent('');
    } catch (error) {
      console.error('Error creating note:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Note</h2>
      <div>
        <label htmlFor="personId">Person ID:</label>
        <input
          type="text"
          id="personId"
          value={personId}
          onChange={(e) => setPersonId(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>
      <button type="submit">Create Note</button>
    </form>
  );
};

export default NoteForm;
