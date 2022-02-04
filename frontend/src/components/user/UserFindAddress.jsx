import React from "react";
import DaumPostCode from "react-daum-postcode";
import { Button, Box, Modal } from "@mui/material";
function UserFindAddress(props) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    boxShadow: 1,
    p: 2,
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";
    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    console.log(fullAddress);
    //fullAddress -> 전체 주소반환
  };

  return (
    <div>
      <Button onClick={handleOpen}>주소 검색</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <DaumPostCode onComplete={handleComplete} className="post-code" />
        </Box>
      </Modal>
    </div>
  );
}

export default UserFindAddress;
