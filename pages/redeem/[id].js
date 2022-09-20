import Paper from '@mui/material/Paper'
import styles from '../../styles/Form.module.css'
import CharityCard from '../../components/CharityCard'
import Typography from '@mui/material/Typography'
import { useForm, Controller } from 'react-hook-form'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import InputAdornment from '@mui/material/InputAdornment'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'

import { useState } from 'react'

export default function VoucherForm ({ voucher }) {
  const [submitted, setSubmitted] = useState(
    voucher.status == 1 || voucher.status == 2
  )

  const charities = voucher.campaign.charitiesChosenByDonor

  // TODO: After getting id, check whether its a valid voucher code or not

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    defaultValues: {
      voucherId: voucher.id
    }
  })

  const onSubmit = data => {
    console.log(data)
    setSubmitted(true)
    fetch('/api/vouchers/' + data.voucherId, {
      method: 'PATCH',
      body: JSON.stringify({
        status: 1,
        charityId: data.selectedCharity,
        amountAdded: data.amount ? parseInt(data.amount) : 0
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
      .then(response => response.json())
      .then(json => console.log(json))
  }

  return (
    <Grid container className={styles.formpage} justifyContent='center'>
      <Grid item xs={12} md={8}>
        <Paper className={styles.form} elevation={5}>
          <Typography variant='h1' className={styles.title}>
            Giving Coupon Redemption
          </Typography>
          <Typography className={styles.instructions}>
            Welcome to the Giving Coupons project, you are redeeming a $
            {voucher.campaign.voucherAmount} coupon sponsored by an anonymous
            donor. Please select a charity below and submit this form. At the
            end of the campaign, our donor will transfer the money to the
            charity you have choosen.
          </Typography>
          <Typography className={styles.instructions}>
            <b>Please review these charities and indicate your choice below.</b>
          </Typography>
          {charities.map(charity => (
            <CharityCard
              key={charity.id}
              id={charity.id}
              name={charity.name}
              description={charity.description}
              image={charity.image}
              link={charity.link}
            />
          ))}
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <Controller
              rules={{ required: 'Please choose a charity to donate to' }}
              name='selectedCharity'
              control={control}
              render={({ field }) =>
                submitted ? (
                  <FormControl>
                    <FormLabel id='demo-radio-buttons-group-label'>
                      I would like to donate the voucher to:
                    </FormLabel>
                    <RadioGroup
                      aria-labelledby='demo-radio-buttons-group-label'
                      name='radio-buttons-group'
                      defaultValue={voucher.charityId}
                      {...field}
                    >
                      {charities.map(charity => {
                        return (
                          <FormControlLabel
                            disabled
                            key={charity.id}
                            value={charity.id}
                            control={<Radio />}
                            label={charity.name}
                          />
                        )
                      })}
                    </RadioGroup>
                  </FormControl>
                ) : (
                  <FormControl>
                    <FormLabel id='demo-radio-buttons-group-label'>
                      I would like to donate the voucher to:
                    </FormLabel>
                    <RadioGroup
                      aria-labelledby='demo-radio-buttons-group-label'
                      name='radio-buttons-group'
                      {...field}
                    >
                      {charities.map(charity => {
                        return (
                          <FormControlLabel
                            key={charity.id}
                            value={charity.id}
                            control={<Radio />}
                            label={charity.name}
                          />
                        )
                      })}
                    </RadioGroup>
                  </FormControl>
                )
              }
            />
            {errors.selectedCharity && (
              <p className={styles.error}>{errors.selectedCharity?.message}</p>
            )}
            {/* <Our hope donor hopes you would consider donating your money directly to these charities as well> */}
            <Typography variant='subtitle1' className={styles.heading}>
              Our hope donor hopes you would consider donating your money
              directly to the charitie selected as well. You can do so by
              filling in the Amount field below, and it is purely optional :)
            </Typography>
            <Controller
              name='amount'
              control={control}
              render={({ field }) =>
                submitted ? (
                  <TextField
                    {...field}
                    label='Amount'
                    disabled
                    className={styles.contact}
                    id='outlined-start-adornment'
                    defaultValue={voucher.amountAdded}
                    sx={{ m: 1, width: 300 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>SGD$</InputAdornment>
                      )
                    }}
                  />
                ) : (
                  <TextField
                    {...field}
                    label='Amount'
                    className={styles.contact}
                    id='outlined-start-adornment'
                    sx={{ m: 1, width: 300 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>SGD$</InputAdornment>
                      )
                    }}
                  />
                )
              }
            />
            <Typography variant='subtitle1' className={styles.heading}>
              Please let us know if you have any feedback regarding this
              project, if you like to join us or if you want us to provide proof
              of the donations, do leave your contact details here.
            </Typography>
            <Controller
              name='name'
              control={control}
              render={({ field }) =>
                submitted ? (
                  <TextField
                    {...field}
                    disabled
                    className={styles.contact}
                    id='outlined-basic'
                    label='Name'
                    variant='outlined'
                    sx={{ width: 300 }}
                  />
                ) : (
                  <TextField
                    {...field}
                    className={styles.contact}
                    id='outlined-basic'
                    label='Name'
                    variant='outlined'
                    sx={{ width: 300 }}
                  />
                )
              }
            />
            <Controller
              name='email'
              control={control}
              render={({ field }) =>
                submitted ? (
                  <TextField
                    {...field}
                    disabled
                    className={styles.contact}
                    id='outlined-basic'
                    label='Email'
                    variant='outlined'
                    sx={{ width: 300 }}
                  />
                ) : (
                  <TextField
                    {...field}
                    className={styles.contact}
                    id='outlined-basic'
                    label='Email'
                    variant='outlined'
                    sx={{ width: 300 }}
                  />
                )
              }
            />
            <Controller
              name='message'
              control={control}
              render={({ field }) =>
                submitted ? (
                  <TextField
                    {...field}
                    className={styles.contact}
                    id='outlined-basic'
                    label='Message'
                    disabled
                    variant='outlined'
                    multiline
                    sx={{ width: 300 }}
                  />
                ) : (
                  <TextField
                    {...field}
                    className={styles.contact}
                    id='outlined-basic'
                    label='Message'
                    variant='outlined'
                    multiline
                    sx={{ width: 300 }}
                  />
                )
              }
            />
            {submitted ? (
              <Typography variant='h6' className={styles.submit}>
                Thank you for filling in this form.
              </Typography>
            ) : (
              <Button
                className={styles.submit}
                variant='contained'
                type='submit'
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

export async function getServerSideProps (context) {
  const id = context.params.id
  const res = await fetch(process.env.URL + `/api/vouchers/` + id)
  const voucher = await res.json()
  return { props: { voucher } }
}
