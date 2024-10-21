import { NextApiRequest, NextApiResponse } from 'next';
import Note from '@/db/models/note';

interface NoteCreate {
  person_id: string;
  content: string;
}

interface NoteUpdate {
  content?: string;
}

interface NoteResponse {
  id: string;
  person_id: string;
  content: string;
  createdAt: Date;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case 'POST':
        return await createNote(req, res);
      case 'GET':
        return await readNote(req, res);
      case 'PUT':
        return await updateNote(req, res);
      case 'DELETE':
        return await deleteNote(req, res);
      default:
        res.setHeader('Allow', ['POST', 'GET', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function createNote(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const body: NoteCreate = req.body;
  const noteData = {
    ...body,
    date: new Date()
  };
  const note = await Note.create(noteData);
  res.status(201).json({ id: note.id });
}

async function readNote(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const { id } = req.query;
  const note = await Note.findByPk(id as string);
  if (note) {
    const response: NoteResponse = {
      id: note.id,
      person_id: note.personId,
      content: note.content,
      createdAt: note.createdAt,
    };
    res.status(200).json(response);
  } else {
    res.status(404).json({ error: 'Note not found' });
  }
}

async function updateNote(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const { id } = req.query;
  const body: NoteUpdate = req.body;
  const noteData = {
    ...body,
    date: new Date()
  };
  const [updated] = await Note.update(noteData, { where: { id } });
  if (updated) {
    res.status(200).json({ message: 'Note updated successfully' });
  } else {
    res.status(404).json({ error: 'Note not found' });
  }
}

async function deleteNote(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const { id } = req.query;
  const deleted = await Note.destroy({ where: { id } });
  if (deleted) {
    res.status(200).json({ message: 'Note deleted successfully' });
  } else {
    res.status(404).json({ error: 'Note not found' });
  }
}
