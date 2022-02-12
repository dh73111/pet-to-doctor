import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box } from "@mui/system";
import { Button, Container } from "@mui/material";
import React, { useState } from "react";
import QuizIcon from "@mui/icons-material/Quiz";
// import { Provider, useSelector, useDispatch } from "react-redux";

function Qna(props) {
  // const user = useSelector((state) => state.user);

  // const dispatch = useDispatch();

  const [expanded, setExpanded] = useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Container>
      <Box item xs={12} sx={{ textAlign: "center" }}>
        {/* <Button
                onClick={() => {
                    dispatch({ type: "test" });
                }}
            >
                테스트
            </Button> */}
        <Typography variant="h4" component="h1" sx={{ mt: 10, mb: 2, fontWeight: 600 }}>
          <QuizIcon sx={{ fontSize: "60px", mb: 2, color: "#309FB3" }} />
          <br />
          자주하는 질문
        </Typography>
        <Accordion expanded={expanded === "panel1"} onChange={handleChange("panel1")}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
            <Typography sx={{ width: "33%", flexShrink: 0 }}>General settings</Typography>
            <Typography sx={{ color: "text.secondary" }}>I am an accordion</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget maximus est, id dignissim quam.</Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === "panel2"} onChange={handleChange("panel2")}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2bh-content" id="panel2bh-header">
            <Typography sx={{ width: "33%", flexShrink: 0 }}>Users</Typography>
            <Typography sx={{ color: "text.secondary" }}>You are currently not an owner</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus, varius pulvinar diam eros in elit. Pellentesque convallis laoreet
              laoreet.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === "panel3"} onChange={handleChange("panel3")}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel3bh-content" id="panel3bh-header">
            <Typography sx={{ width: "33%", flexShrink: 0 }}>Advanced settings</Typography>
            <Typography sx={{ color: "text.secondary" }}>Filtering has been entirely disabled for whole web server</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros, vitae egestas augue. Duis vel est augue.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === "panel4"} onChange={handleChange("panel4")}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel4bh-content" id="panel4bh-header">
            <Typography sx={{ width: "33%", flexShrink: 0 }}>Personal data</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros, vitae egestas augue. Duis vel est augue.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Container>
  );
}

export default Qna;
