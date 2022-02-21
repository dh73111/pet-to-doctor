import { CardMedia, Grid, Button, Input, Box, Typography } from "@mui/material";
import React, { useState } from "react";

function UserPets(props) {
    const [isPetMod, setIsPetMod] = useState(false);
    const pet = props.pet;
    const petCoverStyle = {
        width: "100%",
        height: "100%",
        minHeight: "140px",
        backgroundImage: `url(${process.env.PUBLIC_URL}/img/dogDefaultProfile.jpg)`,
        backgroundSize: "cover",
    };

    return (
        <Grid item xs={6} md={3}>
            <Box sx={{ border: "0.0625rem solid #D7E2EB", borderRadius: "0.25rem", p: 1 }} className='pet_card'>
                {isPetMod === false ? (
                    <Grid container>
                        <CardMedia
                            component='img'
                            minHeight='140'
                            src={`${process.env.PUBLIC_URL}/img/dogDefaultProfile.jpg`}
                            alt='petPhoto'
                            sx={{ borderRadius: "0.25rem" }}
                        />
                        <Grid item xs={12} sx={{ mt: 1 }}>
                            <Typography sx={{ fontWeight: 600, pl: 1 }}>{pet.name}</Typography>
                            <Typography sx={{ float: "right", color: "#263747", opacity: "0.6" }}>
                                {pet.birthDate}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}></Grid>
                        <Grid item xs={12}>
                            <Typography sx={{ float: "right" }}>{pet.species}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography sx={{ float: "right" }}>{pet.weight} kg</Typography>
                        </Grid>
                        <Button
                            onClick={() => {
                                setIsPetMod(true);
                            }}
                            variant='outlined'
                            size='small'>
                            펫정보수정
                        </Button>
                    </Grid>
                ) : (
                    <Grid container>
                        {/* <CardMedia component="img" height="140" src={`${process.env.PUBLIC_URL}/img/dogDefaultProfile.jpg`} alt="petPhoto" /> */}
                        <Box style={petCoverStyle}></Box>
                        <Grid item xs={12}>
                            <Input defaultValue={pet.name} onChange={props.changeModPetInfo("name")} />
                        </Grid>
                        <Grid item xs={12}>
                            <Input defaultValue={pet.birthDate} onChange={props.changeModPetInfo("birthDate")} />
                        </Grid>
                        <Grid item xs={12}>
                            <Input defaultValue={pet.species} onChange={props.changeModPetInfo("species")} />
                        </Grid>
                        <Grid item xs={12}>
                            <Input defaultValue={pet.weight} onChange={props.changeModPetInfo("weight")} />
                        </Grid>
                        <Button
                            onClick={() => {
                                setIsPetMod(false);
                                props.handleModPetInfo(pet.id);
                            }}>
                            수정완료
                        </Button>
                        <Button
                            onClick={() => {
                                setIsPetMod(false);
                            }}>
                            수정취소
                        </Button>
                        <Button
                            onClick={() => {
                                props.handleDeletePetInfo(pet.id);
                            }}>
                            삭제
                        </Button>
                    </Grid>
                )}
            </Box>
        </Grid>
    );
}

export default UserPets;
