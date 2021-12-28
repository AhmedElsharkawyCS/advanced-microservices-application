import React, { useState } from "react"
import Container from "@mui/material/Container"
import Paper from "@mui/material/Paper"
import Form from "@components/Form"
import AttachMoneyIcon from "@mui/icons-material/AttachMoney"
import Grid from "@mui/material/Grid"
import { useRouter } from "next/router"
import TitleIcon from "@mui/icons-material/TitleTwoTone"
import { TextInput } from "@components/Inputs"
import { LoadingButton } from "@components/Buttons"
import { Typography } from "@mui/material"
import ErrorAlert from "@components/Error"
import { useRequest } from "@hooks"

export default function Create() {
  const { push } = useRouter()
  const [title, setTitle] = useState("")
  const [price, setPrice] = useState(0)
  const { doRequest, errors, loading, resetError } = useRequest({
    method: "post",
    url: "/api/tickets",
    onSuccess: () => {
      push("/tickets")
    },
  })
  const onSubmit = (event) => {
    event.preventDefault()
    doRequest({ title, price })
  }

  return (
    <Container maxWidth='xl' sx={{ display: "flex", justifyContent: "center", height: "100%" }}>
      <Paper
        elevation={3}
        sx={{
          width: "450px",
          height: "fit-content",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "50px",
        }}
      >
        <Typography variant='h4' component='h1' gutterBottom sx={{ padding: "20px" }}>
          Create a new ticket!
        </Typography>
        <Form onSubmit={onSubmit} sx={{ width: "100%" }}>
          <Grid container spacing={3} sx={{ padding: "0 50px 40px 50px" }}>
            <Grid item xs={12}>
              <TextInput
                name='title'
                type='text'
                required
                placeholder='Title'
                label='Title'
                fullWidth
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value)
                  resetError()
                }}
                error={!title}
                helperText={!title && "Ticket title is required"}
                InputProps={{
                  endAdornment: <TitleIcon />,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextInput
                name='price'
                type='number'
                placeholder='Price'
                label='Price'
                fullWidth
                value={price}
                required={isNaN(price) || price < 1}
                InputProps={{ startAdornment: <AttachMoneyIcon /> }}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => {
                  setPrice(Number(e.target.value) || e.target.value)
                  resetError()
                }}
                error={isNaN(price) || price < 1}
                helperText={(isNaN(price) || price < 1) && "Ticket price is required"}
              />
            </Grid>
            <ErrorAlert errors={errors} isGrid xs={12} />
            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item xs={12} display='flex' justifyContent='center'>
                  <LoadingButton type='submit' fullWidth loading={loading} sx={{ maxWidth: "150px" }}>
                    Create
                  </LoadingButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Form>
      </Paper>
    </Container>
  )
}
