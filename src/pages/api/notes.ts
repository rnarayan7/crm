import { NextApiRequest, NextApiResponse } from 'next';
import Note from '@/db/models/note';
import { Op } from 'sequelize';

interface NoteListFilters {
  personId?: string;
  content?: string;
  createdAtStart?: Date;
  createdAtEnd?: Date;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case 'GET':
        return await getNotes(req, res);
      default:
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function getNotes(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const filters: NoteListFilters = req.query;
  const where: Record<string, any> = {}; // eslint-disable-line @typescript-eslint/no-explicit-any

  if (filters.personId) {
    where.person_id = filters.personId;
  }

  if (filters.content) {
    where.content = { [Op.like]: `%${filters.content}%` };
  }

  if (filters.createdAtStart) {
    where.createdAt = { [Op.gte]: filters.createdAtStart };
  }

  if (filters.createdAtEnd) {
    where.createdAt = { ...where.createdAt, [Op.lte]: filters.createdAtEnd };
  }

  const notes = await Note.findAll({ where });
  const response = notes.map((note) => ({
    id: note.id,
    personId: note.personId,
    content: note.content,
    createdAt: note.createdAt,
  }));

  res.status(200).json(response);
}
