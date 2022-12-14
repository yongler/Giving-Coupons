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
import * as React from "react"
import * as ga from "../../lib/ga"

export default function VoucherForm({ voucher }) {
  const [submitted, setSubmitted] = useState(voucher?.status == redeemed)
  const [error, setError] = useState()

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      voucherId: voucher?.id,
      amount: voucher?.amountAdded || "",
      message: voucher?.message || "",
      selectedCharity: voucher?.charityId || null,
    },
  })

  if (voucher == null) {
    return <div className={styles.errorPage}>Invalid coupon link</div>
  }
  if (Date.now() > Date.parse(voucher?.campaign.endDate) && !submitted) {
    return <div className={styles.errorPage}>Coupon Expired</div>
  }
  if (error) {
    return <div className={styles.errorPage}>{error}</div>
  }

  const charities = voucher.campaign.charitiesChosenByDonor

  const onSubmit = (data) => {
    if (Date.now() > Date.parse(voucher?.campaign.endDate)) {
      setError("Coupon Expired")
      return
    }
    setSubmitted(true)
    fetch("/api/vouchers/" + data.voucherId, {
      method: "PATCH",
      body: JSON.stringify({
        charityId: data.selectedCharity,
        amountAdded: data.amount ? parseInt(data.amount) : 0,
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

  const handleCharityClick = (name) => {
    ga.event({
      action: "selected charity in donate form",
      params: {
        selectedCharity: name,
      },
    })
  }

  return (
    <Grid container className={styles.formpage} justifyContent="center">
      <Grid item xs={12} md={8}>
        <Paper className={styles.form} elevation={5}>
          <Typography variant="h1" className={styles.title}>
            Giving Coupon Redemption
          </Typography>
          <Typography className={styles.instructions}>
            Welcome to the Giving Coupons project, you are redeeming a $
            {voucher.campaign.voucherAmount} coupon sponsored by an anonymous
            donor. Please <b>choose a charity below and submit this form</b>. At
            the end of the campaign,{" "}
            <b>
              our donor will transfer the money to the charity you have chosen
            </b>
            .
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
              <b>I would like the money to be given to:</b>
            </Typography>
            <Controller
              rules={{ required: "Please choose a charity" }}
              name="selectedCharity"
              control={control}
              render={({ field }) => (
                <FormControl>
                  <RadioGroup {...field}>
                    {charities.map((charity) => {
                      return (
                        <FormControlLabel
                          disabled={submitted}
                          key={charity.id}
                          value={charity.id}
                          control={<Radio />}
                          label={charity.name}
                          onClick={() => handleCharityClick(charity.name)}
                        />
                      )
                    })}
                  </RadioGroup>
                </FormControl>
              )}
            />
            {errors.selectedCharity && (
              <p className={styles.error}>{errors.selectedCharity?.message}</p>
            )}
            <Typography className={styles.question}>
              We encourage you to donate your own money directly to these
              charities as well. This is <b>completely optional</b>. If you
              intend to do so, please tell us how much you plan to donate:
            </Typography>
            <Controller
              name="amount"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  disabled={submitted}
                  type="number"
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
            <Typography className={styles.question}>
              If you have any <b>feedback or questions</b> for us, or are
              interested in joining us, let us know here and include your
              contact details. Alternatively, email us at{" "}
              <i>giving.coupons.sg@gmail.com</i>
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
              <div className={styles.submitText}>
                <Typography variant="h6">
                  Thank you for submitting this form!
                </Typography>
                <Typography>
                  Our donor will transfer the money to your chosen charity
                </Typography>
              </div>
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

export async function getServerSideProps(context) {
  const id = context.params.id
  const res = await fetch(process.env.URL + `/api/vouchers/` + id)
  const voucher = await res.json()
  return { props: { voucher } }
}
