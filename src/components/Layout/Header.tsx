import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography>Star Wars App |</Typography>
        <Button
          color="inherit"
          component={Link}
          to="/search"
          sx={{ padding: 0 }}
        >
          Home
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
