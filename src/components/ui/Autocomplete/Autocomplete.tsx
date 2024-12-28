import { FC } from 'react';
import {
  TextField,
  Autocomplete as MuiAutocomplete,
  CircularProgress,
  ListItem,
  ListItemText,
  Typography,
  Divider,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { Option } from '@app/models';

interface AutocompleteProps {
  onInputChange: (value: string) => void;
  options: Option[];
  loading: boolean;
  onSelect: (event: React.SyntheticEvent, value: Option | null) => void;
}

const Autocomplete: FC<AutocompleteProps> = ({
  onInputChange,
  options,
  loading,
  onSelect,
}) => {
  return (
    <MuiAutocomplete
      filterOptions={(x) => x}
      options={options}
      loading={loading}
      onChange={onSelect}
      getOptionLabel={(option) => option.resource}
      renderOption={(props, option) => (
        <ListItem {...props} alignItems="flex-start" key={option.resource}>
          <ListItemText
            primary={option.resource}
            secondary={
              <>
                {option.items.map((item, index) => (
                  <Typography
                    key={index}
                    sx={{ display: 'block' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {item}
                  </Typography>
                ))}
                <Typography
                  component={Link}
                  to={`/category/${option.resource}`}
                  sx={{
                    display: 'block',
                    mt: 1,
                    textDecoration: 'underline',
                    cursor: 'pointer',
                  }}
                  variant="body2"
                  color="primary"
                >
                  View All
                </Typography>
              </>
            }
          />
          <Divider variant="inset" component="li" />
        </ListItem>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search Star Wars"
          variant="outlined"
          onChange={(event) => onInputChange(event.target.value)}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )} 
    />
  );
};

export default Autocomplete