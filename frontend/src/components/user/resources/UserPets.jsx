import { Card, CardMedia, Grid, Button, Input, Box } from "@mui/material";
import React, { useState } from "react";

function UserPets(props) {
  const [isPetMod, setIsPetMod] = useState(false);
  const pet = props.pet;
  const petCoverStyle = { width: '100%', height: '140px', backgroundImage: `url(${process.env.PUBLIC_URL}/img/dogDefaultProfile.jpg)`, backgroundSize: 'cover'}

  return (
    <Grid item xs={6} md={3}>
      <Card>
        {isPetMod === false ? (
          <Grid container>
            <CardMedia component="img" height="140" src={`${process.env.PUBLIC_URL}/img/dogDefaultProfile.jpg`} alt="petPhoto" />
            <Grid item xs={12}>
              {pet.name}
            </Grid>
            <Grid item xs={12}>
              {pet.birthDate}
            </Grid>
            <Grid item xs={12}>
              {pet.species}
            </Grid>
            <Grid item xs={12}>
              {pet.weight}
            </Grid>
            <Button
              onClick={() => {
                setIsPetMod(true);
              }}
              variant="contained"
            >
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
              }}
              variant="contained"
            >
              펫정보수정완료
            </Button>
            <Button
              onClick={() => {
                setIsPetMod(false);
              }}
              variant="contained"
            >
              펫정보수정취소
            </Button>
            <Button
              onClick={() => {
                props.handleDeletePetInfo(pet.id);
              }}
            >
              펫정보삭제
            </Button>
          </Grid>
        )}
      </Card>
    </Grid>
  );
}

export default UserPets;
