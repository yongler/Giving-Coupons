import Paper from "@mui/material/Paper"
import styles from "../../../styles/Form.module.css"
import CharityCard from "../../../components/CharityCard"
import Typography from "@mui/material/Typography"
import { useForm, Controller } from "react-hook-form"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import FormControlLabel from "@mui/material/FormControlLabel"
import InputAdornment from "@mui/material/InputAdornment"
import Grid from "@mui/material/Grid"
import { useState, useEffect } from "react"
import Checkbox from "@mui/material/Checkbox"
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment"
import { auth } from "../../../firebase/firebaseApp"
import { useAuthState } from "react-firebase-hooks/auth"
import { useRouter } from "next/dist/client/router"
import Loading from "../../../components/Loading"

export default function VoucherForm() {
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState()

  const router = useRouter()
  const [charities, setCharities] = useState([])
  const [user] = useAuthState(auth)

  useEffect(() => {
    if (!user) {
      router.push("/admin/login")
    }

    user?.getIdToken().then((jwt) => {
      fetch("/api/charities/", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + jwt,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setCharities(data)
        })
    })
  }, [])

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      numberOfVouchers: "",
      voucherValue: "",
    },
  })

  if (error) {
    return <div className={styles.errorPage}>{error}</div>
  }

  const onSubmit = (data) => {
    setSubmitted(true)

    const chosenCharities = []
    for (const key in data) {
      if (data[key] === true) {
        chosenCharities.push(key)
      }
    }

    const tempBody = JSON.stringify({
      endDate: data.deadline.toDate(),
      charitiesChosenByDonor: chosenCharities,
      donor: data.donorName,
      name: data.campaignName,
      description: data.description,
      numVouchers: parseInt(data.numberOfVouchers),
      voucherAmount: parseInt(data.voucherValue),
    })

    user?.getIdToken().then((jwt) => {
      fetch("/api/campaigns/", {
        method: "POST",
        body: tempBody,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: "Bearer " + jwt,
        },
      }).then((response) => {
        if (!response.ok) {
          setError("Sorry, an error has occured")
        }
      })
    })
  }

  return (
    <>
      {!user ? (
        <Loading />
      ) : (
        <Grid container className={styles.formpage} justifyContent="center">
          <Grid item xs={12} md={8}>
            <Paper className={styles.form} elevation={5}>
              <Typography variant="h1" className={styles.title}>
                Create a campaign
              </Typography>

              <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                  name="campaignName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      margin="dense"
                      {...field}
                      disabled={submitted}
                      label="Campaign Name"
                      fullWidth
                    />
                  )}
                />
                <Controller
                  name="donorName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      margin="dense"
                      {...field}
                      disabled={submitted}
                      label="Donor name"
                      fullWidth
                    />
                  )}
                />
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      margin="dense"
                      {...field}
                      disabled={submitted}
                      label="Description of the campaign"
                      fullWidth
                    />
                  )}
                />
                <br />
                <br />
                <Controller
                  name="deadline"
                  key="deadline"
                  control={control}
                  render={({ field }) => (
                    <>
                      <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DateTimePicker
                          type="datetime-local"
                          {...field}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </LocalizationProvider>
                    </>
                  )}
                />

                <Typography className={styles.instructions}>
                  <b>Charity choices.</b>
                </Typography>
                {charities.map((charity) => (
                  <CharityCard
                    key={charity.id}
                    id={charity.id}
                    name={charity.name}
                    description={charity.description}
                    image={charity.image}
                    link={charity.link}
                  />
                ))}
                <Typography className={styles.question}>
                  <b>I would like to support:</b>
                </Typography>

                {charities.map((checboxItem) => (
                  <Controller
                    name={checboxItem.id}
                    control={control}
                    key={checboxItem.id}
                    render={({ field: { onChange, value } }) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={!!value}
                            onChange={(event, item) => {
                              onChange(item)
                            }}
                            name={checboxItem.name}
                            color="primary"
                          />
                        }
                        label={checboxItem.name}
                      />
                    )}
                  />
                ))}

                {errors.selectedCharity && (
                  <p className={styles.error}>
                    {errors.selectedCharity?.message}
                  </p>
                )}
                <Controller
                  name="numberOfVouchers"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      margin="dense"
                      disabled={submitted}
                      type="number"
                      require
                      label="Number of vouchers"
                      fullWidth
                      inputProps={{ min: 0 }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  )}
                />
                <Controller
                  name="voucherValue"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      margin="dense"
                      disabled={submitted}
                      required
                      type="number"
                      label="Value of each voucher"
                      fullWidth
                      inputProps={{ min: 0 }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">$</InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
                {submitted ? (
                  <Typography variant="h6" className={styles.submitText}>
                    Thank you for submitting this form.
                  </Typography>
                ) : (
                  <Button
                    className={styles.submitButton}
                    variant="contained"
                    fullWidth
                    type="submit"
                  >
                    Submit
                  </Button>
                )}
              </form>
            </Paper>
          </Grid>
        </Grid>
      )}
    </>
  )
}
