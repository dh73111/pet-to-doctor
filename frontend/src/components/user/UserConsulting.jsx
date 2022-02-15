import React, { useRef, useEffect, useState } from "react";
import io from "socket.io-client";
import { Box, Grid, BottomNavigation, BottomNavigationAction } from "@mui/material";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import MicIcon from "@mui/icons-material/Mic";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import { useDispatch, useSelector } from "react-redux";
const pc_config = {
    iceServers: [
        {
            urls: [
                "stun:stun.l.google.com:19302",
                "stun:stun1.l.google.com:19302",
                "stun:stun2.l.google.com:19302",
                "stun:stun3.l.google.com:19302",
                "stun:stun4.l.google.com:19302",
            ],
        },
    ],
};
const SOCKET_SERVER_URL = "https://i6b209.p.ssafy.io/signaling";
// const SOCKET_SERVER_URL = "http://192.168.35.26:9000";

function UserConsulting(props) {
    const dispatch = useDispatch();
    const { id } = useParams();
    const navigate = useNavigate();
    const socketRef = useRef();
    const pcRef = useRef();
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const { user } = useSelector((store) => store);
    console.log(user);
    let stream;
    const setVideoTracks = async () => {
        try {
            stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true,
            });
            if (localVideoRef.current) localVideoRef.current.srcObject = stream;
            if (!(pcRef.current && socketRef.current)) return;
            stream.getTracks().forEach((track) => {
                if (!pcRef.current) return;
                pcRef.current.addTrack(track, stream);
            });
            pcRef.current.onicecandidate = (e) => {
                if (e.candidate) {
                    if (!socketRef.current) return;
                    console.log("onicecandidate");
                    socketRef.current.emit("candidate", e.candidate);
                }
            };
            pcRef.current.oniceconnectionstatechange = (e) => {
                console.log(e);
            };

            pcRef.current.ontrack = (ev) => {
                console.log(ev.stream);
                console.log("add remotetrack success");
                if (remoteVideoRef.current) {
                    remoteVideoRef.current.srcObject = ev.streams[0];
                    console.log(remoteVideoRef.current.srcObject);
                }
            };
            socketRef.current.emit("joinRoom", {
                room: id,
                userId: user.id,
            });
        } catch (e) {
            console.error(e);
        }
    };
    const createOffer = async () => {
        console.log("create offer");
        if (!(pcRef.current && socketRef.current)) return;
        try {
            const sdp = await pcRef.current.createOffer({
                offerToReceiveAudio: true,
                offerToReceiveVideo: true,
            });
            await pcRef.current.setLocalDescription(new RTCSessionDescription(sdp));
            socketRef.current.emit("offer", sdp);
        } catch (e) {
            console.error(e);
        }
    };
    const createAnswer = async (sdp) => {
        if (!(pcRef.current && socketRef.current)) return;
        try {
            await pcRef.current.setRemoteDescription(new RTCSessionDescription(sdp));
            console.log("answer set remote description success");
            const mySdp = await pcRef.current.createAnswer({
                offerToReceiveVideo: true,
                offerToReceiveAudio: true,
            });
            console.log("create answer");
            await pcRef.current.setLocalDescription(new RTCSessionDescription(mySdp));
            socketRef.current.emit("answer", mySdp);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        const init = async () => {
            socketRef.current = await io.connect(SOCKET_SERVER_URL);
            pcRef.current = await new RTCPeerConnection(pc_config);
            await socketRef.current.emit("disconnectA", user.id);
            socketRef.current.on("all_users", (allUsers) => {
                if (allUsers.length > 0) {
                    createOffer();
                }
            });
            socketRef.current.on("getOffer", (sdp) => {
                console.log(sdp);
                console.log("get offer");
                createAnswer(sdp);
            });
            socketRef.current.on("getAnswer", (sdp) => {
                console.log("get answer");
                if (!pcRef.current) return;
                pcRef.current.setRemoteDescription(new RTCSessionDescription(sdp));
                console.log(sdp);
            });
            socketRef.current.on("getCandidate", async (candidate) => {
                if (!pcRef.current) return;
                await pcRef.current.addIceCandidate(new RTCIceCandidate(candidate));
                console.log("candidate add success");
            });
            socketRef.current.on("invalid", () => {
                alert("중복 입장은 불가능합니다.");
                navigate("/petodoctor");
            });
            await dispatch({ type: "socket", socket: socketRef.current });
            await setVideoTracks();
        };

        init();

        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
            }
            if (pcRef.current) {
                pcRef.current.close();
            }
        };
    }, []);

    const [video, setVideo] = useState(true);
    const [mic, setMic] = useState(true);

    const videoStartOrStop = () => {
        localVideoRef.current.srcObject.getVideoTracks().forEach((track) => {
            track.enabled = !track.enabled;
        });
    };

    const micStartOrStop = () => {
        localVideoRef.current.srcObject.getAudioTracks().forEach((track) => {
            track.enabled = !track.enabled;
        });
    };
    console.log(user, "user");
    return (
        <Box>
            <Grid container>
                <Grid item md={6}>
                    <Box>
                        <video
                            style={{ width: "98%", height: 500, margin: 5, background: "black" }}
                            ref={localVideoRef}
                            autoPlay
                            muted></video>
                    </Box>
                </Grid>
                <Grid item md={6}>
                    <Box>
                        <video
                            style={{ width: "98%", height: 500, margin: 5, background: "black" }}
                            ref={remoteVideoRef}
                            autoPlay></video>
                    </Box>
                    <Box></Box>
                </Grid>
            </Grid>
            <Box sx={{ mt: 3 }}>
                <BottomNavigation showLabels>
                    <BottomNavigationAction
                        onClick={() => {
                            setVideo(!video);
                            videoStartOrStop(!video);
                        }}
                        label={
                            <Box sx={{ fontSize: 20, fontWeight: "bold" }}>{video ? "비디오 끄기" : "비디오 켜기"}</Box>
                        }
                        icon={<VideoCameraFrontIcon color={video ? "primary" : ""} sx={{ fontSize: 35 }} />}
                    />
                    <BottomNavigationAction
                        onClick={() => {
                            setMic(!mic);
                            micStartOrStop(!mic);
                        }}
                        label={
                            <Box sx={{ fontSize: 20, fontWeight: "bold" }}>{mic ? "마이크 끄기" : "마이크 켜기"}</Box>
                        }
                        icon={<MicIcon sx={{ fontSize: 35 }} color={mic ? "primary" : ""} />}
                    />
                    {user.role === "ROLE_DOCTOR" ? (
                        <BottomNavigationAction
                            onClick={() => {
                                window.open(
                                    `http://localhost:3000/doctorprescriptonform/${id}`,
                                    "처방전",
                                    "width=#,height=#"
                                );
                            }}
                            label={<Box sx={{ fontSize: 20, fontWeight: "bold" }}>처방작성</Box>}
                            icon={<MedicalServicesIcon sx={{ fontSize: 35, color: "red" }} />}
                        />
                    ) : (
                        <></>
                    )}
                    <BottomNavigationAction
                        onClick={async () => {
                            socketRef.current.emit("disconnectA", user.userId);
                            window.location.href = "http://localhost:3000/petodoctor";
                        }}
                        label={<Box sx={{ fontSize: 20, fontWeight: "bold" }}>나가기</Box>}
                        icon={<ExitToAppIcon sx={{ fontSize: 35, color: "blue" }} />}></BottomNavigationAction>
                </BottomNavigation>
            </Box>
        </Box>
    );
}

export default UserConsulting;
