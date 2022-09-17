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
import { useState } from "react";

export default function VoucherForm({ data }) {
  const [submitted, setSubmitted] = useState(false);
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
  };

  // list of charities, query the backend for the charity data from getServerSideProps
  const charities = data;

  return (
    <div className={styles.formpage}>
      <Paper className={styles.form} elevation={5}>
        <Typography variant="h6" className={styles.heading}>
          Welcome to PROJECT GIVING COUPONS, you have received a $10 coupon{" "}
          {"(Voucher Code: " + id + ") "}
          sponsored by an anonymous donor, and the donor would like you to
          choose a charity from the list below for the money to go to!
        </Typography>
        {/* <Charity 1-6 with a few sentences each + link> */}
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
        {submitted ? (
          <Typography variant="h6" className={styles.completed}>
            We have received your submission :)
          </Typography>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <Controller
              rules={{ required: "Please choose a charity to donate to" }}
              name="selectcharity"
              control={control}
              render={({ field }) => (
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
                          value={charity.name}
                          control={<Radio />}
                          label={charity.name}
                        />
                      );
                    })}
                  </RadioGroup>
                </FormControl>
              )}
            />
            {errors.selectcharity && (
              <p className={styles.error}>{errors.selectcharity?.message}</p>
            )}
            {/* <Our hope donor hopes you would consider donating your money directly to these charities as well> */}
            {/* <Typography variant="subtitle1" className={styles.heading}>
            Our hope donor hopes you would consider donating your money directly
            to these charities as well
          </Typography> */}

            {/* <Please let us know if you have any feedback regarding this project, or if you like to join us, if you want us to provide proof of the donations, do leave your contact details here> */}
            <Typography variant="subtitle1" className={styles.heading}>
              Please let us know if you have any feedback regarding this
              project, if you like to join us or if you want us to provide proof
              of the donations, do leave your contact details here.
            </Typography>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className={styles.contact}
                  id="outlined-basic"
                  label="Name"
                  variant="outlined"
                  sx={{ width: 300 }}
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className={styles.contact}
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  sx={{ width: 300 }}
                />
              )}
            />
            <Controller
              name="message"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className={styles.contact}
                  id="outlined-basic"
                  label="Message"
                  variant="outlined"
                  multiline
                  sx={{ width: 300 }}
                />
              )}
            />
            <Button className={styles.submit} variant="contained" type="submit">
              Submit
            </Button>
          </form>
        )}
        {/* <* Yes! I intend to donate money to these charities> */}
        {/* <No> */}
      </Paper>
    </div>
  );
}

export async function getServerSideProps(context) {
  // Fetch data from external API
  const id = context.params.id;
  const res = await fetch(`http:/localhost:3000/api/vouchers/` + id);
  const voucher = await res.json();
  const charityRes = await fetch(
    "http:/localhost:3000/api/campaigns/" + voucher.campaignId
  );
  const campaign = await charityRes.json();
  const data = campaign.charities;
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
  return { props: { data } };
}
