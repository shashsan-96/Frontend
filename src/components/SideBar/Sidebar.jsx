import {Storefront} from "@material-ui/icons";
import HomeIcon from '@material-ui/icons/Home';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import AddIcon from '@material-ui/icons/Add';
import FeedbackIcon from '@material-ui/icons/Feedback';
import AuthService from "../../api/auth.service";
export default function Sidebar() {


  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="link" style={{ textDecoration: "none" }}>
              <li className="sidebarListItem">
                <HomeIcon className="HomeIcon" />
                Home
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Book Managment</h3>
          <ul className="sidebarList">
            <Link
              to="/users"
              className="link"
              style={{ textDecoration: "none" }}
            >
              <li className="sidebarListItem">
                <LocalLibraryIcon className="LocalLibraryIcon" />
                View Books
              </li>
            </Link>
            <Link
              to="/products"
              className="link"
              style={{ textDecoration: "none" }}
            >
              <li className="sidebarListItem">
                <AddIcon className="AddIcon" />
                Add Books
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Stationery Managment</h3>
          <ul className="sidebarList">
            <Link
              to="/products"
              className="link"
              style={{ textDecoration: "none" }}
            >
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                View Stationery Items
              </li>
            </Link>
            <Link
              to="/products"
              className="link"
              style={{ textDecoration: "none" }}
            >
              <li className="sidebarListItem">
                <AddIcon className="AddIcon" />
                Add Stationery Items
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">FeedBack Management</h3>
          <ul className="sidebarList">
            <Link
              to="/feedBackM"
              className="link"
              style={{ textDecoration: "none" }}
            >
              <li className="sidebarListItem">
                <FeedbackIcon className="FeedbackIcon" />
                Manage Feedbacks
              </li>
            </Link>
          </ul>
        </div>
        <Button
          className="button"
          type="button"
          variant="danger"
          onClick={(e) => {
            e.preventDefault();
            AuthService.logout();
            window.location.href = "/login";
          }}>
          Logout
        </Button>
      </div>
    </div>
  );
}
