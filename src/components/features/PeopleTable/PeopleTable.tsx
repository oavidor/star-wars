import { useState, useEffect, FC } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  DataGrid,
  GridColDef,
  GridRowModesModel,
  GridRowModes,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowEditStopReasons,
  GridSlots,
} from '@mui/x-data-grid';
import Tooltip from '@mui/material/Tooltip';
import { fetchPeople } from './utils';
import { initialRows } from './propTypes'
import { Person } from '@app/models'
import PeopleTableToolbar from './PeopleTableToolbar/PeopleTableToolbar';
import styled from '@emotion/styled';

export const TableContainer = styled(Box)`
  height: 65vh;
  width: 100%;
  .actions {
    color: ${({ theme }) => theme.palette.text.secondary};
  }
  .textPrimary {
    color: ${({ theme }) => theme.palette.text.primary};
  }
`;


const PeopleTable: FC = () => {
  const [people, setPeople] = useState<Person[]>(initialRows);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadPeople = async () => {
      setLoading(true);
      const data = await fetchPeople();
      setPeople(data.results);
      setNextPage(data.next);
      setLoading(false);
    };

    loadPeople();
  }, []);

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (
    params,
    event,
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    setPeople(people.filter((row) => row.url !== id));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = people.find((row) => row.url === id);
    if (editedRow && editedRow.isNew) {
      setPeople(people.filter((row) => row.url !== id));
    }
  };

  const processRowUpdate = (newRow: Person) => {
    const updatedRow: Person = { ...newRow, isNew: false };
    setPeople(people.map((row) => (row.url === newRow.url ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const loadMore = async () => {
    if (nextPage) {
      setLoading(true);
      const data = await fetchPeople(nextPage);
      setPeople((prevPeople) => [...prevPeople, ...data.results]);
      setNextPage(data.next);
      setLoading(false);
    }
  };

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', flex: 1, editable: true },
    { field: 'birth_year', headerName: 'Birth Year', flex: 1, editable: true },
    { field: 'eye_color', headerName: 'Eye Color', flex: 1, editable: true },
    { field: 'gender', headerName: 'Gender', flex: 1, editable: true },
    { field: 'hair_color', headerName: 'Hair Color', flex: 1, editable: true },
    { field: 'height', headerName: 'Height', flex: 1, editable: true },
    { field: 'skin_color', headerName: 'Skin Color', flex: 1, editable: true },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      flex: 0.5,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
        return isInEditMode ? [
          <Tooltip title="Save">
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />
          </Tooltip>,
          <Tooltip title="Cancel">
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />
          </Tooltip>,
        ] : [
          <Tooltip title="Edit">
            <GridActionsCellItem
              icon={<EditIcon />}
              label="Edit"
              className="textPrimary"
              onClick={handleEditClick(id)}
              color="inherit"
            />
          </Tooltip>,
          <Tooltip title="Delete">
            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="Delete"
              onClick={handleDeleteClick(id)}
              color="error"
            />
          </Tooltip>,
        ]
      },
    },
  ];

  return (
      <TableContainer>
        <DataGrid
          rows={people}
          columns={columns}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          slots={{
            toolbar: PeopleTableToolbar as unknown as GridSlots['toolbar'],
          }}
          slotProps={{
            toolbar: { setRows: setPeople, setRowModesModel },
          }}
          getRowId={(row) => row.url}
          hideFooterPagination
          sx={{
            '& .MuiDataGrid-root': {
              border: 'none',
            },
            '& .MuiDataGrid-columnHeaders': {
              borderBottom: 'none',
            },
            '& .MuiDataGrid-virtualScroller': {
              borderBottom: 'none',
            },
            '& .MuiDataGrid-footerContainer': {
              border: 'none',
              display: 'none',
            },
            '& .MuiDataGrid-toolbarContainer': {
              borderBottom: 'none',
            },
          }}
        />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {loading && <p>Loading...</p>}
          {nextPage && !loading && (
            <Button
              variant="contained"
              sx={{ marginTop: '2em' }}
              onClick={loadMore}
            >
              Load More
            </Button>
          )}
        </div>
      </TableContainer>
  );
};

export default PeopleTable;
