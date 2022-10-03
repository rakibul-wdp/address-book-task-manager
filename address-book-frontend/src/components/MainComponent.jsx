import { makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { CSVLink } from "react-csv";
import { Pagination } from '@mui/material';
import { Stack } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import FormData from './AddFormData';
import EditContact from './EditContact';
import { selectedProducts, setInitialProduct } from '../redux/actions/ProductActions';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  '@media (min-width: 780px)': {
    width: '80%'
  },
  box2: {

    width: "80%",
    height: 90,
    display: "flex",
    flexDirection: "row",

  },
  box2Div: {
    display: "flex",
    alignItems: "center",


  },
  box2DivTitle: {

    display: "flex",
    alignItems: "center",
    '&:hover': {
      cursor: "pointer",
    },
  },
  delAndEditDiv: {
    '&:hover': {
      cursor: "pointer",
    },
  }
}));



const MainComponent = () => {
  //Redux part
  const products = useSelector((state) => state);
  //List of data stored in redux
  const FinalProducts = (products.allProducts.products);

  //Current selected Product index
  const SelectedProduct = (products.allProducts.selectedProducts);

  //Text to be searched
  const SearchText = products.allProducts.searchText;

  const dispatch = useDispatch();

  //component for using MUI
  const classes = useStyles();

  //Current List data storage
  let [userData, setUserData] = useState(FinalProducts);

  //Key to render after updating list
  const [dialogKey, setDialogKey] = useState(0);

  // useEffect to store data to local storage
  useEffect(() => {
    if (FinalProducts.length !== 0 && FinalProducts !== null) localStorage.setItem("myData", JSON.stringify(FinalProducts));
  }, [FinalProducts])

  // useEffect to store data initially fetched from local storage
  useEffect(() => {
    let var1 = localStorage.getItem("myData");
    if (var1 !== null) dispatch(setInitialProduct(JSON.parse(var1)));
    if (var1 !== null) setUserData(JSON.parse(var1));
  }, [])

  //handle edit
  const handleEdit = (e) => {

    const { id } = e.target.parentElement;
    if (id !== "") dispatch(selectedProducts(id))
  }

  //handle delete
  const handleDelete = (e) => {
    let cnf = window.confirm("Are you Sure ? ");
    if (cnf) {
      const { id } = e.target;
      let cnt = 1;
      let var1;
      setUserData((prevstate) => {
        if (cnt === 1) {
          var1 = userData.filter(
            (info, index) => {
              return ((index != id));
            }
          );
          cnt--;
        }
        //Storing updated data into local storage
        localStorage.setItem("myData", JSON.stringify(var1));
        return var1;
      });
      setDialogKey(Math.random());
    }
  };

  // handle Sort
  const com = (item1, item2) => {
    if (item1.name < item2.name) {
      return -1;
    }
    else {
      return 1;
    }

  }

  //Handle Add User
  //UseEffect to sort data after adding new element on list
  useEffect(() => {
    setUserData(FinalProducts)
    userData = FinalProducts;
    userData.sort(com);
    setDialogKey(Math.random());
  }, [FinalProducts]);

  //Handle Search part
  useEffect(() => {
    if (userData.length === 0) {
      setUserData(FinalProducts);
      userData = FinalProducts;
    }
    if (SearchText === "" || SearchText === undefined) {
      setUserData(FinalProducts);
    }
    else {
      setUserData((prevstate) => {
        let var1 = userData.filter(
          (info) => {
            return (info.name.toLowerCase().includes(SearchText) || info.phone_no.toLowerCase().includes(SearchText))
          }

        );
        return var1;
      })
    }
  }, [SearchText])

  //Pagination Part
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(7);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = userData.slice(indexOfFirstPost, indexOfLastPost);

  //CSV Part
  const headers = [
    {
      label: "Name", key: "name"
    },
    {
      label: "Phone No", key: "phone_no"
    },

  ]

  const csvLink = {
    filename: "file.csv",
    headers: headers,
    data: userData,
  }

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", height: "fit-content" }}>
      <div style={{ width: "94%", minHeight: 90, display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid black", borderRadius: "5px", borderColor: "gray", height: "fit-content" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "93%", height: "94%", flexWrap: "wrap" }}>
          <div>
            <div style={{ height: 24, display: "flex", flexDirection: "row", alignItems: "center" }}><span style={{ fontWeight: "bold", fontSize: 22 }}>Users</span> <div style={{ backgroundColor: "#afa", borderRadius: 25, width: 75, textAlign: "center", marginLeft: 8 }}>{userData.length} users </div></div>
            <div>Manage your team members and their account permission here</div>
          </div>

          <div style={{ display: "flex", flexDirection: "row", width: 255, justifyContent: "space-between" }}>
            <CSVLink {...csvLink} style={{ display: "flex", textDecoration: "none", color: "black", backgroundColor: "white", height: 32, borderRadius: 5, justifyContent: "center", alignItems: "center" }}><span>Download CSV</span></CSVLink>
            <FormData />
          </div>
        </div>
      </div>

      <div style={{ width: "94%", display: "flex", alignItems: "center", flexDirection: "column", border: "1px solid black", border: "1px solid black", borderRadius: "5px", borderColor: "gray", justifyContent: "center", height: "fit-content" }} key={dialogKey}>

        <div className={classes.box2} style={{ fontSize: "20px", fontWeight: "bold", textDecoration: "underline", justifyContent: "center" }}>
          <div className={classes.box2DivTitle} style={{ width: "53.7%", marginLeft: 60 }} >Name</div>
          <div className={classes.box2DivTitle} style={{ width: "8.9%" }}>Phone No</div>
        </div>
        {
          currentPosts.map((item, index) => {
            return (
              <div key={index} className={classes.box2} style={{ backgroundColor: (index & 1) ? "#d9d4d4" : "#f5f0f0", borderRadius: "8px", padding: "5px 0 5px 0", marginBottom: "1.5rem", height: "fit-content", display: "flex", alignItems: "center", justifyContent: "space-around", flexWrap: "wrap" }}>

                <div style={{ height: "100%", width: "40%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <span>{item.name}</span>
                </div>

                <div className={classes.box2Div} style={{ width: "30%" }}>{item.phone_no}</div>

                <div className={classes.box2Div} style={{ width: 150 }} id={index} >
                  {
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
                      <div className={classes.delAndEditDiv} style={{ width: "45%", }}><img src="https://cdn-icons-png.flaticon.com/512/1345/1345874.png" alt="" style={{ height: "78%", width: "50%" }} onClick={handleDelete} id={index} /></div>
                      <div className={classes.delAndEditDiv} style={{ width: "45%", }} id={index} onClick={handleEdit} ><EditContact /></div>
                    </div>
                  }
                </div>
              </div>
            )
          })
        }
      </div>
      <div style={{ height: 62, width: "94%", display: "flex", justifyContent: "center", alignItems: "center", border: "1px solid black", borderRadius: "5px", borderColor: "gray", }}>
        <Stack spacing={2}>
          <Pagination count={10} color="primary"
            onChange={(e, value) => { setCurrentPage(value) }}
          />
        </Stack>
      </div>
    </div>
  )
}

export default MainComponent;
