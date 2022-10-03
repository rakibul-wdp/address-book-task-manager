import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setProducts } from '../redux/actions/ProductActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const AddFormData = () => {
  //Redux part
  const products = useSelector((state) => state);
  //List of data stored in redux
  const FinalProducts = (products.allProducts.products);

  //Current selected Product index
  const SelectedProduct = (products.allProducts.selectedProducts);

  //Text to be searched
  const SearchText = products.allProducts.searchText;

  const dispatch = useDispatch();

  //Comment Popup Part
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    //setting initial error state
    setIsPhoneNoError(false);
    setOpen(true);
  };

  const handleSaveClose = () => {
    let flag = false;
    setIsPhoneNoError(false);
    //Condition to check whether phone no already exists
    for (let i in FinalProducts) {
      if (FinalProducts[i].phone_no === formValue.phone_no) {
        flag = true;
        setIsPhoneNoError(true);
        break;
      }
    }
    if (!flag) {

      dispatch(setProducts(formValue));
      setOpen(false);
    }

  };
  const handleCancelClose = () => {

    setOpen(false);
  };

  //Data Part
  const initialState = { name: "", phone_no: "" };
  const [formValue, setFormValue] = useState(initialState);
  const [isPhoneNoError, setIsPhoneNoError] = useState(false);

  const handleChange = (event) => {

    const { name, value } = event.target;
    setFormValue({ ...formValue, [name]: value });
  };

  return (
    <>
      <div>
        <Button variant="contained" onClick={handleClickOpen}>
          + Add User
        </Button>
        <Dialog open={open} onClose={handleCancelClose}>
          <DialogTitle>Enter Details</DialogTitle>
          <DialogContent >
            <DialogContentText>
              Please Enter appropriate Details
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              type="email"
              fullWidth
              variant="standard"
              name='name'
              onChange={handleChange}

            />

            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Phone no"
              type="email"
              fullWidth
              variant="standard"
              name='phone_no'
              onChange={handleChange}
            />
          </DialogContent>
          <DialogContentText style={{ color: "red", display: (isPhoneNoError) ? "flex" : 'none', justifyContent: "center" }}>Phone No already exists</DialogContentText>

          <DialogActions>
            <Button onClick={handleCancelClose}>Cancel</Button>
            <Button onClick={handleSaveClose}>Done</Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  )
}

export default AddFormData;