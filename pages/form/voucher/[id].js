import { useRouter } from "next/router";
import CharityCard from "../../../components/CharityCard";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import styles from "../../../styles/Form.module.css";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import InputAdornment from "@mui/material/InputAdornment";

export default function VoucherForm({ charities, voucher }) {
  const [submitted, setSubmitted] = useState(
    voucher.status == 1 || voucher.status == 2
  );
  const { query } = useRouter();
  const { id } = query;
  // TODO: After getting id, check whether its a valid voucher code or not

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      voucherId: id,
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    setSubmitted(true);
    fetch("/api/vouchers/" + data.voucherId, {
      method: "PATCH",
      body: JSON.stringify({
        status: 1,
        charityId: data.selectedCharity,
        amountAdded: data.amount ? parseInt(data.amount) : 0,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          marginTop: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">
          Welcome to PROJECT GIVING COUPONS, you have received a $10 coupon{" "}
          {"(Voucher Code: " + id + ") "}
          sponsored by an anonymous donor, and the donor would like you to
          choose a charity from the list below for the money to go to!
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

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Controller
              rules={{ required: "Please choose a charity to donate to" }}
              name="selectedCharity"
              control={control}
              render={({ field }) =>
                submitted ? (
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">
                      I would like to donate the voucher to:
                    </FormLabel>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="radio-buttons-group"
                      defaultValue={voucher.charityId}
                      {...field}
                    >
                      {charities.map((charity) => {
                        return (
                          <FormControlLabel
                            disabled
                            key={charity.id}
                            value={charity.id}
                            control={<Radio />}
                            label={charity.name}
                          />
                        );
                      })}
                    </RadioGroup>
                  </FormControl>
                ) : (
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">
                      I would like to donate the voucher to:
                    </FormLabel>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="radio-buttons-group"
                      {...field}
                    >
                      {charities.map((charity) => {
                        return (
                          <FormControlLabel
                            key={charity.id}
                            value={charity.id}
                            control={<Radio />}
                            label={charity.name}
                          />
                        );
                      })}
                    </RadioGroup>
                  </FormControl>
                )
              }
            />
          </Grid>

          {errors.selectedCharity && (
            <p className={styles.error}>{errors.selectedCharity?.message}</p>
          )}

          <Grid item xs={12}>
            {/* <Our hope donor hopes you would consider donating your money directly to these charities as well> */}
            <Typography variant="subtitle1">
              Our hope donor hopes you would consider donating your money
              directly to the charitie selected as well. You can do so by
              filling in the Amount field below, and it is purely optional :)
            </Typography>
            <Controller
              name="amount"
              control={control}
              render={({ field }) =>
                submitted ? (
                  <TextField
                    {...field}
                    label="Amount"
                    disabled
                    id="outlined-start-adornment"
                    defaultValue={voucher.amountAdded}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">SGD$</InputAdornment>
                      ),
                    }}
                  />
                ) : (
                  <TextField
                    {...field}
                    id="outlined-start-adornment"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">SGD$</InputAdornment>
                      ),
                    }}
                  />
                )
              }
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle1">
              Please let us know if you have any feedback regarding this
              project, if you like to join us or if you want us to provide proof
              of the donations, do leave your contact details here.
            </Typography>
            <Controller
              name="name"
              control={control}
              render={({ field }) =>
                submitted ? (
                  <TextField
                    {...field}
                    disabled
                    id="outlined-basic"
                    label="Name"
                    variant="outlined"
                    className={styles.contact}
                    sx={{ width: 300 }}
                  />
                ) : (
                  <TextField
                    {...field}
                    id="outlined-basic"
                    label="Name"
                    variant="outlined"
                    className={styles.contact}
                    sx={{ width: 300 }}
                  />
                )
              }
            />
            <Controller
              name="email"
              control={control}
              render={({ field }) =>
                submitted ? (
                  <TextField
                    {...field}
                    disabled
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    className={styles.contact}
                    sx={{ width: 300 }}
                  />
                ) : (
                  <TextField
                    {...field}
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    className={styles.contact}
                    sx={{ width: 300 }}
                  />
                )
              }
            />
            <Controller
              name="message"
              control={control}
              render={({ field }) =>
                submitted ? (
                  <TextField
                    {...field}
                    id="outlined-basic"
                    label="Message"
                    disabled
                    variant="outlined"
                    className={styles.contact}
                    multiline
                    sx={{ width: 300 }}
                  />
                ) : (
                  <TextField
                    {...field}
                    id="outlined-basic"
                    label="Message"
                    variant="outlined"
                    className={styles.contact}
                    multiline
                    sx={{ width: 300 }}
                  />
                )
              }
            />
          </Grid>
          <Grid item xs={12}>
            {submitted ? (
              <Typography variant="h6">
                Thank you for filling in this form.
              </Typography>
            ) : (
              <Button
                className={styles.submit}
                variant="contained"
                type="submit"
              >
                Submit
              </Button>
            )}
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export async function getServerSideProps(context) {
  // Fetch data from external API
  const id = context.params.id;
  const res = await fetch(process.env.URL + `/api/vouchers/` + id);
  const voucher = await res.json();
  const charityRes = await fetch(
    process.env.URL + "/api/campaigns/" + voucher.campaignId
  );
  const campaign = await charityRes.json();
  const charities = campaign.charitiesChosenByDonor;

  return { props: { charities, voucher } };
}
