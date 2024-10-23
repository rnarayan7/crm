import { NextApiRequest, NextApiResponse } from 'next';
import Person from '@/db/models/person';

interface PersonCreate {
  name: string;
  age: number;
  email: string;
}

interface PersonUpdate {
  name?: string;
  age?: number;
  email?: string;
}

interface PersonResponse {
  id: string;
  name: string;
  email: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case 'POST':
        return await createPerson(req, res);
      case 'GET':
        return await readPerson(req, res);
      case 'PUT':
        return await updatePerson(req, res);
      case 'DELETE':
        return await deletePerson(req, res);
      default:
        res.setHeader('Allow', ['POST', 'GET', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function createPerson(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const body: PersonCreate = req.body;
  const personData = {
    ...body,
    date: new Date()
  };
  const person = await Person.create(personData);
  res.status(201).json({ id: person.id });
}

async function readPerson(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const { id } = req.query;
  const person = await Person.findByPk(id as string);
  if (person) {
    const response: PersonResponse = {
      id: person.id,
      name: person.name,
      email: person.email,
    };
    res.status(200).json(response);
  } else {
    res.status(404).json({ error: 'Person not found' });
  }
}

async function updatePerson(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const { id } = req.query;
  const body: PersonUpdate = req.body;
  const personData = {
    ...body,
    date: new Date()
  };
  const [updated] = await Person.update(personData, { where: { id } });
  if (updated) {
    res.status(200).json({ message: 'Person updated successfully' });
  } else {
    res.status(404).json({ error: 'Person not found' });
  }
}

async function deletePerson(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const { id } = req.query;
  const deleted = await Person.destroy({ where: { id } });
  if (deleted) {
    res.status(200).json({ message: 'Person deleted successfully' });
  } else {
    res.status(404).json({ error: 'Person not found' });
  }
}
