import config from '@app/config/config';
import { Person } from '@app/models';

const PEOPLE_API_URL = `${config.API_URL}/people`;

export const fetchPeople = async (
  url: string = PEOPLE_API_URL,
): Promise<{ results: Person[]; next: string | null }> => {
  const response = await fetch(url);
  const data = await response.json();
  return {
    results: data.results,
    next: data.next,
  };
};
