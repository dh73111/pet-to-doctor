import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box } from "@mui/system";
import { Button, Container } from "@mui/material";
import React, { useState } from "react";
import QuizIcon from "@mui/icons-material/Quiz";
// import { Provider, useSelector, useDispatch } from "react-redux";

function Qna(props) {
    const [expanded, setExpanded] = useState(false);
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Container sx={{ mb: 15 }} maxWidth='md'>
            <Box item xs={12} sx={{ textAlign: "center" }}>
                <Typography variant='h4' component='h1' sx={{ mt: 10, mb: 8, fontWeight: 600 }}>
                    자주하는 질문
                </Typography>
                <Accordion expanded={expanded === "panel1"} onChange={handleChange("panel1")}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls='panel1bh-content'
                        id='panel1bh-header'>
                        <Typography sx={{ width: "13%", flexShrink: 0, textAlign: "left" }}>
                            <img src={`${process.env.PUBLIC_URL}/img/qna_q.png`} alt='q' />
                        </Typography>
                        <Typography
                            sx={{
                                color: "text.secondary",
                                fontSize: "18px",
                                fontWeight: "bold",
                                lineHeight: "50px",
                                borderTop: "1px solid #eaeaea",
                            }}>
                            예약은 어떻게 하나요?
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ backgroundColor: "#FBFBFD", float: "left", py: 2 }}>
                        <Typography sx={{ width: "13%", flexShrink: 0, textAlign: "left", float: "left" }}>
                            <img src={`${process.env.PUBLIC_URL}/img/qna_a.png`} alt='q' />
                        </Typography>
                        <Typography sx={{ width: "86%", float: "left", textAlign: "left" }}>
                            화면 상단의 병원찾기 탭을 클릭하셔서 예약하실 병원을 검색하신 뒤 예약탭의 예약버튼을 눌러
                            예약하실 수 있습니다.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === "panel2"} onChange={handleChange("panel2")}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls='panel2bh-content'
                        id='panel2bh-header'>
                        <Typography sx={{ width: "13%", flexShrink: 0, textAlign: "left" }}>
                            <img src={`${process.env.PUBLIC_URL}/img/qna_q.png`} alt='q' />
                        </Typography>

                        <Typography
                            sx={{ color: "text.secondary", fontSize: "18px", fontWeight: "bold", lineHeight: "50px" }}>
                            예약이 취소되었어요.
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ backgroundColor: "#FBFBFD", float: "left", py: 2 }}>
                        <Typography sx={{ width: "13%", flexShrink: 0, textAlign: "left", float: "left" }}>
                            <img src={`${process.env.PUBLIC_URL}/img/qna_a.png`} alt='q' />
                        </Typography>
                        <Typography sx={{ width: "86%", float: "left" }}>
                            수의사선생님과 병원의 사정에 따라 임의로 예약이 취소 될 수 있습니다. 예약이 취소 될 경우
                            화면 우측 상단에서 알림을 확인하실 수 있으며 상담결제 내역은 자동으로 취소됨을 알려드립니다.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === "panel3"} onChange={handleChange("panel3")}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls='panel3bh-content'
                        id='panel3bh-header'>
                        <Typography sx={{ width: "13%", flexShrink: 0, textAlign: "left" }}>
                            <img src={`${process.env.PUBLIC_URL}/img/qna_q.png`} alt='q' />
                        </Typography>
                        <Typography
                            sx={{ color: "text.secondary", fontSize: "18px", fontWeight: "bold", lineHeight: "50px" }}>
                            리뷰작성은 어디서 해야하나요?
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ backgroundColor: "#FBFBFD", float: "left", py: 2 }}>
                        <Typography sx={{ width: "13%", flexShrink: 0, textAlign: "left", float: "left" }}>
                            <img src={`${process.env.PUBLIC_URL}/img/qna_a.png`} alt='q' />
                        </Typography>
                        <Typography sx={{ width: "86%", float: "left", textAlign: "left" }}>
                            리뷰 작성은 상담 완료 후 나타나는 화면에서 작성하실 수 있습니다. 리뷰는 수정, 삭제할 수
                            없으니 신중하게 작성해 주시기 바랍니다.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === "panel4"} onChange={handleChange("panel4")}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls='panel4bh-content'
                        id='panel4bh-header'>
                        <Typography sx={{ width: "13%", flexShrink: 0, textAlign: "left" }}>
                            <img src={`${process.env.PUBLIC_URL}/img/qna_q.png`} alt='q' />
                        </Typography>
                        <Typography
                            sx={{ color: "text.secondary", fontSize: "18px", fontWeight: "bold", lineHeight: "50px" }}>
                            회원가입을 해야만 상담이 가능한가요?
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ backgroundColor: "#FBFBFD", float: "left", py: 2 }}>
                        <Typography sx={{ width: "13%", flexShrink: 0, textAlign: "left", float: "left" }}>
                            <img src={`${process.env.PUBLIC_URL}/img/qna_a.png`} alt='q' />
                        </Typography>
                        <Typography sx={{ width: "86%", float: "left", textAlign: "left" }}>
                            펫투닥터는 소중한 고객님의 개인정보 보호와 원활한 상담진료를 위하여 회원가입을 필수로 받고
                            있습니다. 반려동물정보 저장, 배송지 저장 등 다양한 편의기능이 있으니 가입하여 사용해 주시면
                            감사하겠습니다.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </Box>
        </Container>
    );
}

export default Qna;
