import React, { useRef, useEffect, useState } from "react";
import { OpenVidu } from "openvidu-browser";
import { Box, Grid, BottomNavigation, BottomNavigationAction } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import MicIcon from "@mui/icons-material/Mic";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import { useParams } from "react-router-dom";
import axios from "axios";
const OPENVIDU_SERVER_URL = "https://" + window.location.hostname + ":4443";
const OPENVIDU_SERVER_SECRET = "MY_SECRET";

function UserConsulting(props) {
    const { id } = useParams();
    const [state, setState] = useState({
        mySessionId: id,
        myUserName: "userId" + Math.floor(Math.random() * 100),
        session: undefined,
        mainStreamManager: undefined,
        publisher: undefined,
        subscribers: [],
    });
    let OV;
    const getToken = () => {
        return createSession(this.state.mySessionId).then((sessionId) => createToken(sessionId));
    };
    const createToken = (sessionId) => {
        return new Promise((resolve, reject) => {
            let data = {};
            axios
                .post(OPENVIDU_SERVER_URL + "/openvidu/api/sessions/" + sessionId + "/connection", data, {
                    headers: {
                        Authorization: "Basic " + btoa("OPENVIDUAPP:" + OPENVIDU_SERVER_SECRET),
                        "Content-Type": "application/json",
                    },
                })
                .then((response) => {
                    console.log("TOKEN", response);
                    resolve(response.data.token);
                })
                .catch((error) => reject(error));
        });
    };

    const createSession = (sessionId) => {
        return new Promise((resolve, reject) => {
            let data = JSON.stringify({ customSessionId: sessionId });
            axios
                .post(OPENVIDU_SERVER_URL + "/openvidu/api/sessions", data, {
                    headers: {
                        Authorization: "Basic " + btoa("OPENVIDUAPP:" + OPENVIDU_SERVER_SECRET),
                        "Content-Type": "application/json",
                    },
                })
                .then((response) => {
                    console.log("CREATE SESION", response);
                    resolve(response.data.id);
                })
                .catch((response) => {
                    let error = Object.assign({}, response);
                    if (error?.response?.status === 409) {
                        resolve(sessionId);
                    } else {
                        console.log(error);
                        console.warn(
                            "No connection to OpenVidu Server. This may be a certificate error at " +
                                OPENVIDU_SERVER_URL
                        );
                        if (
                            window.confirm(
                                'No connection to OpenVidu Server. This may be a certificate error at "' +
                                    OPENVIDU_SERVER_URL +
                                    '"\n\nClick OK to navigate and accept it. ' +
                                    'If no certificate warning is shown, then check that your OpenVidu Server is up and running at "' +
                                    OPENVIDU_SERVER_URL +
                                    '"'
                            )
                        ) {
                            window.location.assign(OPENVIDU_SERVER_URL + "/accept-certificate");
                        }
                    }
                });
        });
    };

    const deleteSubscriber = (streamManager) => {
        let subscribers = this.state.subscribers;
        let index = subscribers.indexOf(streamManager, 0);
        if (index > -1) {
            subscribers.splice(index, 1);
            this.setState({
                subscribers: subscribers,
            });
        }
    };

    const joinSession = () => {
        OV = new OpenVidu();

        setState(
            {
                session: OV.initSession(),
            },
            () => {
                console.log("joinSession");
                let mySession = state.session;
                console.log("ddd");
                mySession.on("streamCreated", (event) => {
                    let subscriber = mySession.subscribe(event.stream, undefined);
                    let subscribers = state.subscribers;
                    subscribers.push(subscriber);
                    setState({
                        subscribers: subscribers,
                    });
                });

                mySession.on("streamDestroyed", (event) => {
                    deleteSubscriber(event.stream.streamManager);
                });

                mySession.on("exception", (exception) => {
                    console.warn(exception);
                });

                getToken().then((token) => {
                    mySession
                        .connect(token, { clientData: state.myUserName })
                        .then(() => {
                            let publisher = this.OV.initPublisher(undefined, {
                                audioSource: undefined, // The source of audio. If undefined default microphone
                                videoSource: undefined, // The source of video. If undefined default webcam
                                publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
                                publishVideo: true, // Whether you want to start publishing with your video enabled or not
                                resolution: "640x480", // The resolution of your video
                                frameRate: 30, // The frame rate of your video
                                insertMode: "APPEND", // How the video is inserted in the target element 'video-container'
                                mirror: false, // Whether to mirror your local video or not
                            });
                            mySession.publish(publisher);
                            setState({
                                mainStreamManager: publisher,
                                publisher: publisher,
                            });
                        })
                        .catch((error) => {
                            console.log("There was an error connecting to the session:", error.code, error.message);
                        });
                });
            }
        );
    };

    useEffect(() => {
        // window.addEventListener("beforeunload", onbeforeunload);
        // window.removeEventListener("beforeunload", onbeforeunload);
    }, []);

    const navigate = useNavigate();
    const [video, setVideo] = useState(true);
    const [mic, setMic] = useState(true);
    const [isUser, setUser] = useState("doctor");
    return (
        <Box>
            <Grid container>
                <Grid item md={6}>
                    <Box>
                        <video style={{ width: "98%", height: 500, margin: 5, background: "black" }} autoPlay></video>
                    </Box>
                </Grid>
                <Grid item md={6}>
                    <Box>
                        <video style={{ width: "98%", height: 500, margin: 5, background: "black" }} autoPlay></video>
                    </Box>
                    <Box></Box>
                </Grid>
            </Grid>
            <Box sx={{ mt: 3 }}>
                <BottomNavigation showLabels>
                    <BottomNavigationAction
                        onClick={() => {
                            setVideo(!video);
                        }}
                        label={
                            <Box sx={{ fontSize: 20, fontWeight: "bold" }}>{video ? "비디오 끄기" : "비디오 켜기"}</Box>
                        }
                        icon={<VideoCameraFrontIcon color={video ? "primary" : ""} sx={{ fontSize: 35 }} />}
                    />
                    <BottomNavigationAction
                        onClick={() => {
                            setMic(!mic);
                        }}
                        label={
                            <Box sx={{ fontSize: 20, fontWeight: "bold" }}>{mic ? "마이크 끄기" : "마이크 켜기"}</Box>
                        }
                        icon={<MicIcon sx={{ fontSize: 35 }} color={mic ? "primary" : ""} />}
                    />
                    {isUser === "doctor" ? (
                        <BottomNavigationAction
                            label={<Box sx={{ fontSize: 20, fontWeight: "bold" }}>처방작성</Box>}
                            icon={<MedicalServicesIcon sx={{ fontSize: 35, color: "red" }} />}
                        />
                    ) : (
                        <></>
                    )}
                    <BottomNavigationAction
                        onClick={({ history }) => {
                            navigate("/");
                        }}
                        label={<Box sx={{ fontSize: 20, fontWeight: "bold" }}>나가기</Box>}
                        icon={<ExitToAppIcon sx={{ fontSize: 35, color: "blue" }} />}
                    ></BottomNavigationAction>
                </BottomNavigation>
            </Box>
        </Box>
    );
}

export default UserConsulting;
