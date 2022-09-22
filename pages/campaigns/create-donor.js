import Paper from "@mui/material/Paper"
import styles from "../../styles/Form.module.css"
import CharityCard from "../../components/CharityCard"
import Typography from "@mui/material/Typography"
import { useForm, Controller } from "react-hook-form"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Radio from "@mui/material/Radio"
import RadioGroup from "@mui/material/RadioGroup"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormControl from "@mui/material/FormControl"
import InputAdornment from "@mui/material/InputAdornment"
import Grid from "@mui/material/Grid"
import { useState } from "react"
import { redeemed } from "../../util/constants/voucherStatus"
import FormGroup from "@mui/material/FormGroup"
import Checkbox from "@mui/material/Checkbox"

export default function VoucherForm({ charities }) {
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState()
  const [numberOfVouchers, setNumberOfVouchers] = useState(0)
  const [voucherValue, setVoucherValue] = useState(0)

  const handleNumberOfVouchersChange = (event) => {
    setNumberOfVouchers(event.target.value)
  }

  const handleVoucherValueChange = (event) => {
    setVoucherValue(event.target.value)
  }

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      campaignId: 123,
      numberOfVouchers: "",
      voucherValue: "",
      message: "",
      selectedCharity: null,
      // campaignId: campaign?.id,
      // amount: campaign?.amountAdded || "",
      // message: campaign?.message || "",
      // selectedCharity: campaign?.charityId || null,
    },
  })

  if (error) {
    return <div className={styles.errorPage}>{error}</div>
  }

  const onSubmit = (data) => {
    setSubmitted(true)
    fetch("/api/campaigns/" + data.campaignId, {
      method: "PATCH",
      body: JSON.stringify({
        campaignId: data.selectedcampaign,
        numberOfVouchers: data.numberOfVouchers
          ? parseInt(data.numberOfVouchers)
          : 0,
        voucherValue: data.voucherValue ? parseInt(data.voucherValue) : 0,
        message: data.message,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((response) => {
      if (!response.ok) {
        setError("Sorry, an error has occured")
      }
    })
  }

  return (
    <Grid container className={styles.formpage} justifyContent="center">
      <Grid item xs={12} md={8}>
        <Paper className={styles.form} elevation={5}>
          <Typography variant="h1" className={styles.title}>
            Create a campaign
          </Typography>
          <Typography className={styles.instructions}>
            Welcome to the Giving Coupons project, where your donated funds will
            encourage many others to donate as well, while also raising
            awareness for the charities. Thank you for taking part in this
            project and making Singapore a better place.
          </Typography>

          <Typography className={styles.instructions}>
            Feel free to fill in your name, otherwise we can make you anonymous.
            Please also fill in the email that you would like us to communicate
            with you and select a deadline for the campaign (around 1 month is
            the best). We will provide proof of donations at the end of the
            campaign.
          </Typography>

          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                margin="dense"
                {...field}
                disabled={submitted}
                label="Your name"
                fullWidth
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                margin="dense"
                {...field}
                disabled={submitted}
                label="Your email"
                fullWidth
              />
            )}
          />
          <Controller
            name="deadline"
            control={control}
            render={({ field }) => (
              <TextField
                margin="dense"
                {...field}
                disabled={submitted}
                label="Deadline of the campaign"
                fullWidth
              />
            )}
          />
          <Typography className={styles.instructions}>
            <b>Please review these charities and indicate your choice below.</b>
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <Typography className={styles.question}>
              <b>I would like to support:</b>
            </Typography>
            <Controller
              rules={{ required: "Please choose a charity" }}
              name="selectedCharity"
              control={control}
              render={({ field }) => (
                <FormGroup>
                  <FormControl>
                    {charities.map((charity) => {
                      return (
                        <FormControlLabel
                          disabled={submitted}
                          key={charity.id}
                          value={charity.id}
                          control={<Checkbox defaultUnchecked />}
                          label={charity.name}
                        />
                      )
                    })}
                  </FormControl>
                </FormGroup>
              )}
            />
            {errors.selectedCharity && (
              <p className={styles.error}>{errors.selectedCharity?.message}</p>
            )}
            <Typography className={styles.question}>
              Please indicate the number of vouchers you would like to generate
              and the value of each. The total amount of funds will be
              auto-generated and shown below. Any additional funds will be
              donated directly to the charities at the end of the campaign.
            </Typography>
            <Controller
              name="numberOfVouchers"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="dense"
                  disabled={submitted}
                  type="number"
                  label="Number of vouchers"
                  fullWidth
                  inputProps={{ min: 0 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={numberOfVouchers}
                  onChange={handleNumberOfVouchersChange}
                />
              )}
            />
            <Controller
              name="voucherValue"
              control={control}
              render={({ field }) => (
                <TextField
                  margin="dense"
                  {...field}
                  disabled={submitted}
                  type="number"
                  label="Value of each voucher"
                  fullWidth
                  inputProps={{ min: 0 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                  value={voucherValue}
                  onChange={handleVoucherValueChange}
                />
              )}
            />
            <Typography className={styles.question}>
              <b>Total funds needed: ${voucherValue * numberOfVouchers}</b>
            </Typography>

            <Typography className={styles.question}>
              If you have any feedback or questions for us, let us know here and
              include your contact details. Alternatively, reach out to us at
              giving.coupons.sg@gmail.com
            </Typography>
            <Controller
              name="message"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  disabled={submitted}
                  variant="outlined"
                  multiline
                  fullWidth
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
  )
}

export async function getServerSideProps() {
  const res = await fetch(process.env.URL + `/api/charities/`)
  const charities = await res.json()
  return { props: { charities } }
}
