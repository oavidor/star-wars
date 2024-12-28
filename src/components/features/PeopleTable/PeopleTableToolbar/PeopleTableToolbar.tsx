import {
  GridRowModesModel,
  GridRowModes,
  GridToolbarContainer,
} from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { Person } from '@app/models';
import { FC, useCallback } from 'react';

export interface EditToolbarProps {
  setRows: (newRows: (oldRows: Person[]) => Person[]) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
  ) => void;
}

const PeopleTableToolbar: FC<EditToolbarProps> = ({setRows, setRowModesModel }) => {

  const handleOnAddClick = useCallback(() => {
    const id = `${Date.now()}`;
    const newRow: Person =  {
      name: '',
      birth_year: '',
      eye_color: '',
      gender: '',
      hair_color: '',
      height: '',
      skin_color: '',
      url: id,
      isNew: true,
    }
    setRows((oldRows) => [
      ...oldRows,
      newRow
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));
  },[setRows, setRowModesModel]);

  return (
    <GridToolbarContainer
      sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}
    >
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleOnAddClick}
      >
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

export default PeopleTableToolbar