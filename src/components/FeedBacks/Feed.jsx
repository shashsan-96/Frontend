import React, { useState, useEffect } from "react";
import { forwardRef } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import MaterialTable from "material-table";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import PrintIcon from "@material-ui/icons/Print";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import { useHistory } from "react-router";
import { Button, Dialog, DialogActions, DialogTitle } from "@material-ui/core";
import AuthService from "../../api/auth.service";
import UserService from "../../api/user.service";
import fd from "../../api/feed.service";


const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};




function Feed() {
  const history = useHistory();

  function test(){
    let user = AuthService.getCurrentUser();
    let role = "";
    console.log(user);
    role = user.roles[0];
    if (role !== "ROLE_USER") {
      AuthService.logout();
      history.push("/");
    }
  }
  

  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [dat, setD] = React.useState(null);
  const handleClickOpen = (d) => {
    setOpen(true);
    setD(d);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDel = () => {
    setOpen(false);
    del();
  };


  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };
  const handleDel2 = () => {
    setOpen2(false);
    delAll();
  };
  





  const del = () => {
    console.log(dat._id);
    fd.DeleteFeedBackById(dat._id).then(() => {
      fd.getAllFeedbacks().then((res) => {
        console.log(res.data);
        setData(res.data);
      });
    });
  };

  const delAll = () => {
    fd.DeleteAll().then(() => {
      fd.getAllFeedbacks().then((res) => {
        console.log(res.data);
        setData(res.data);
      });
    });
  };





  let columns = [
    { title: "id", field: "id", hidden: true },
    { title: "Rate", field: "rate" },
    { title: "Message", field: "message" },
    { title: "Date", field: "date" },
  ];
  const [data, setData] = useState([]);

  useEffect(() => {
     test()

    UserService.getAdmin().then(
      (response) => {},
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
          console.error(resMessage);
        if (resMessage!==null ) {
          AuthService.logout();
          history.push("/"); 
        }
      }
    );



    fd.getAllFeedbacks()
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  });

  const actions = [
    {
      icon: () => <PrintIcon />,
      tooltip: "Print All",
      isFreeAction: true,
      onClick: () => {
        exportPDF(data);
      },
    },

    {
        icon: () => <DeleteOutlinedIcon />,
        tooltip: "Delete All",
        isFreeAction: true,
        onClick: (event) => {
            handleClickOpen2();
        },
      },


    {
      icon: () => <DeleteOutlinedIcon />,
      tooltip: "Delete",
      onClick: (event, rowData) => {
        handleClickOpen(rowData);
      },
    },
  ];

  const exportPDF = (data) => {
    const unit = "pt";
    const size = "A3";
    const orientation = "portrait";

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(18);

    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    let yyyy = today.getFullYear();

    today = mm + "/" + dd + "/" + yyyy;

    const title = "FeedBack Report  " + today;
    const headers = [
      [
        "Rate",
        "Message",
        "Date",
       
      ],
    ];

    const d = data.map((feed) => [
      feed.rate,
      feed.message,
      feed.date
    
    ]);
    let content = {
      startX: 100,
      startY: 50,
      head: headers,
      body: d,
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("report.pdf");
  };

  return (
    <div>
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Confirm Before Deleting"}
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Disagree
            </Button>
            <Button onClick={handleDel} color="primary" autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>

      <div>
        <Dialog
          open={open2}
          onClose={handleClose2}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Confirm Before Deleting All"}
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleClose2} color="primary">
              Disagree
            </Button>
            <Button onClick={handleDel2} color="primary" autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>

      <div className="userList">
        <MaterialTable
          style={{
            width: 800,
            marginLeft: "15px",
            marginTop: "10px",
            marginBottom: "100px",
            fontWeight: "bolder",
          }}
          title="FeedBacks"
          columns={columns}
          data={data}
          icons={tableIcons}
          actions={actions}
          options={{
            actionsCellStyle: {
              color: "red",
            },

            headerStyle: {
              backgroundColor: "white",
              color: "black",
              fontSize: "16px",
            },
           
            paging: true,
          }}
        />
      </div>
    </div>
  );
}

export default Feed;
