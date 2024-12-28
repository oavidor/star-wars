import { FC, useState, useEffect, useMemo, useCallback } from 'react';
import { debounce } from 'lodash';
import { useNavigate } from 'react-router-dom';
import { Autocomplete } from '@app/components/ui';
import { Option} from '@app/models'
import { fetchData } from './utils';


const Search: FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [options, setOptions] = useState<Option[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const debouncedFetchData = useMemo(
    () =>
      debounce(async (query: string) => {
        if (query) {
          setLoading(true);
          const results = await fetchData(query);
          setOptions(results);
          setLoading(false);
        } else {
          setOptions([]);
        }
      }, 700),
    []
  );

  useEffect(() => {
    debouncedFetchData(inputValue);
  }, [inputValue, debouncedFetchData]);

  const handleSelect = useCallback(
    (_: React.SyntheticEvent, value: Option | null) => {
      if (value) {
        navigate(`/category/${value.resource}`);
      }
    },
    [navigate]
  );

  return (
    <Autocomplete
      onInputChange={setInputValue}
      options={options}
      loading={loading}
      onSelect={handleSelect}
    />
  );
};

export default Search;
