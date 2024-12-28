import config from '@app/config/config';
import { SWAPIResult, Option} from '@app/models'


export const fetchData = async (query: string): Promise<Option[]> => {
  const requests = config.API_RESOURCES.map((resource) =>
    fetch(`${`${config.API_URL}/${resource}`}/?search=${query}`).then(
      (response) => response.json(),
    ),
  );

  const responses = await Promise.all(requests);

  const result = responses.map((response, index) => ({
    resource: config.API_RESOURCES[index],
    items: response.results
      .slice(0, 3)
      .map((result: SWAPIResult) => result.name ?? result.title),
  }));
  return result;
};
