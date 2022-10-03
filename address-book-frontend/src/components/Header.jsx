import React from 'react'
import { useDispatch } from 'react-redux';
import { Box, TextField } from '@mui/material';
import { setSearchText } from '../redux/actions/ProductActions';

const Header = () => {
  //Redux part
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(setSearchText(e.target.value))
  }

  return (
    <>
      <div style={{ width: "100%", display: "flex", minHeight: 178, justifyContent: "center" }}>
        <div style={{ display: "flex", justifyContent: "space-between", width: "82%" }}>
          <div>
            <h2>Address Book Manager</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "row", width: "50%" }}>
            <Box
              component="form"
              sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
              }}
              noValidate
              autoComplete="off"
              style={{ width: "100%" }}
            >
              <TextField id="outlined-basic" label="Search" variant="outlined" style={{ width: "95%" }} onChange={handleChange} />
            </Box>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header;