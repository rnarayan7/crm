import { NextApiRequest, NextApiResponse } from 'next';
import Person from '@/db/models/person';
import { Op } from 'sequelize';
import { PersonResponse } from '@/pages/api/person';

interface PersonListFilters {
  name?: string;
  email?: string;
  createdAtStart?: Date;
  createdAtEnd?: Date;
  updatedAtStart?: Date;
  updatedAtEnd?: Date;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case 'GET':
        return await getPeople(req, res);
      default:
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function getPeople(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const filters: PersonListFilters = req.query;
  const where: Record<string, any> = {}; // eslint-disable-line @typescript-eslint/no-explicit-any

  if (filters.name) {
    where.name = { [Op.like]: `%${filters.name}%` };
  }

  if (filters.email) {
    where.email = { [Op.like]: `%${filters.email}%` };
  }

  if (filters.createdAtStart) {
    where.createdAt = { [Op.gte]: filters.createdAtStart };
  }

  if (filters.createdAtEnd) {
    where.createdAt = { ...where.createdAt, [Op.lte]: filters.createdAtEnd };
  }

  if (filters.updatedAtStart) {
    where.updatedAt = { [Op.gte]: filters.updatedAtStart };
  }

  if (filters.updatedAtEnd) {
    where.updatedAt = { ...where.updatedAt, [Op.lte]: filters.updatedAtEnd };
  }

  const people = await Person.findAll({ where });
  const response: PersonResponse[] = people.map((person) => ({
    id: person.id,
    name: person.name,
    email: person.email,
  }));

  res.status(200).json(response);
}
