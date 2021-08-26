import React from "react";
import a from "../../assets/book.svg";
import Image from "react-bootstrap/Image";
import { Button } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import { useHistory } from "react-router";
import "./load.css";
export default function Load() {
    const history = useHistory();
    function e()
    {
        history.push("/");
    }

  return (
    <div className="ab">
      <Image src={a} fluid />
      <h1>Welcome</h1>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        startIcon={<SendIcon />}
        onClick={e}
        style={{marginLeft:"20px"}}
      >
        continue
      </Button>
    </div>
  );
}
