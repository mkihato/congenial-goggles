import { Box, TextField, Button, AppBar, Toolbar } from '@mui/material';
import CallHistory from '../components/CallHistory';
import CallLogs from '../components/CallLogs';
import DialPad from '../components/DialPad';
import SearchIcon from '@mui/icons-material/Search';

const Call=()=>{
    return(
    <div className='main-content'>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="default" >
        <Toolbar>
        <SearchIcon />
          <TextField
            variant="outlined"
            placeholder="SEARCH"
            size="small"
            sx={{ flexGrow: 1, marginRight: 2 }}
            style={{maxWidth:'60%'}}
          />
          <Button variant="contained" color="primary">
            ACTIVE
          </Button>
        </Toolbar>
      </AppBar>
      <Box sx={{ display: 'flex', height: 'calc(100vh - 64px)' }}>
        <CallHistory />
        <CallLogs />
        <DialPad />
      </Box>
    </Box>
        </div>
    )
    


}

export default Call;