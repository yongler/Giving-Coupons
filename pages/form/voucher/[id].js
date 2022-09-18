import { useRouter } from "next/router";
import Paper from "@mui/material/Paper";
import styles from "../../../styles/Form.module.css";
import CharityCard from "../../../components/CharityCard";
import Typography from "@mui/material/Typography";
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import InputAdornment from "@mui/material/InputAdornment";
import { useState } from "react";
import axios from "axios";

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
    <div className={styles.formpage}>
      <Paper className={styles.form} elevation={5}>
        <Typography variant="h6" className={styles.heading}>
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
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
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
          {errors.selectcharity && (
            <p className={styles.error}>{errors.selectcharity?.message}</p>
          )}
          {/* <Our hope donor hopes you would consider donating your money directly to these charities as well> */}
          <Typography variant="subtitle1" className={styles.heading}>
            Our hope donor hopes you would consider donating your money directly
            to the charitie selected as well. You can do so by filling in the
            Amount field below, and it is purely optional :)
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
                  className={styles.contact}
                  id="outlined-start-adornment"
                  defaultValue={voucher.amountAdded}
                  sx={{ m: 1, width: 300 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">SGD$</InputAdornment>
                    ),
                  }}
                />
              ) : (
                <TextField
                  {...field}
                  label="Amount"
                  className={styles.contact}
                  id="outlined-start-adornment"
                  sx={{ m: 1, width: 300 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">SGD$</InputAdornment>
                    ),
                  }}
                />
              )
            }
          />
          <Typography variant="subtitle1" className={styles.heading}>
            Please let us know if you have any feedback regarding this project,
            if you like to join us or if you want us to provide proof of the
            donations, do leave your contact details here.
          </Typography>
          <Controller
            name="name"
            control={control}
            render={({ field }) =>
              submitted ? (
                <TextField
                  {...field}
                  disabled
                  className={styles.contact}
                  id="outlined-basic"
                  label="Name"
                  variant="outlined"
                  sx={{ width: 300 }}
                />
              ) : (
                <TextField
                  {...field}
                  className={styles.contact}
                  id="outlined-basic"
                  label="Name"
                  variant="outlined"
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
                  className={styles.contact}
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  sx={{ width: 300 }}
                />
              ) : (
                <TextField
                  {...field}
                  className={styles.contact}
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
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
                  className={styles.contact}
                  id="outlined-basic"
                  label="Message"
                  disabled
                  variant="outlined"
                  multiline
                  sx={{ width: 300 }}
                />
              ) : (
                <TextField
                  {...field}
                  className={styles.contact}
                  id="outlined-basic"
                  label="Message"
                  variant="outlined"
                  multiline
                  sx={{ width: 300 }}
                />
              )
            }
          />
          {!submitted && (
            <Button className={styles.submit} variant="contained" type="submit">
              Submit
            </Button>
          )}
        </form>
      </Paper>
    </div>
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
  // Pass data to the page via props
  // const data = [
  //   {
  //     id: 1,
  //     name: "Autism Association (Singapore)",
  //     description:
  //       "The Autism Association (Singapore) is a Social Service Organisation in Singapore, dedicated to supporting and serving individuals with autism towards maximising their potential, helping them lead meaningful and quality lives in society.",
  //     image: "../../../images/AutismAssociationSG.png",
  //     link: "https://www.autismlinks.org.sg/",
  //   },
  //   {
  //     id: 2,
  //     name: "Make-A-Wish Singapore",
  //     description:
  //       "Make-A-Wish Singapore is a children’s charity organisation that grants the wishes of children ages 3 to 18 years old with critical illnesses. We are a part of the world’s largest wish granting organisation and the only wish granting organisation of its kind in Singapore.",
  //     image: "../../../images/Make-A-Wish-SG.png",
  //     link: "https://makeawish.org.sg/",
  //   },
  //   {
  //     id: 3,
  //     name: "Food from the Heart",
  //     description:
  //       "Food from the Heart is a IPC-status food charity that feeds the needy in Singapore. Our food distribution programmes are run with sustainable charity in mind. This means that we are committed to providing continued food security to our beneficiaries for as long as they need it.",
  //     image: "../../../images/FoodFromTheHeart.png",
  //     link: "https://www.foodfromtheheart.sg/",
  //   },
  // ];
  return { props: { charities, voucher } };
}
