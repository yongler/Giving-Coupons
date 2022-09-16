import { useRouter } from "next/router";
import Paper from "@mui/material/Paper";
import styles from "../../../styles/Form.module.css";
import CharityCard from "../../../components/CharityCard";

// list of charities, query the backend for the charity data
const charities = [
  {
    id: 1,
    name: "Autism Association (Singapore)",
    description:
      "The Autism Association (Singapore) is a Social Service Organisation in Singapore, dedicated to supporting and serving individuals with autism towards maximising their potential, helping them lead meaningful and quality lives in society.",
    image: "../../../images/AutismAssociationSG.png",
    link: "https://www.autismlinks.org.sg/",
  },
  {
    id: 2,
    name: "Make-A-Wish Singapore",
    description:
      "Make-A-Wish Singapore is a children’s charity organisation that grants the wishes of children ages 3 to 18 years old with critical illnesses. We are a part of the world’s largest wish granting organisation and the only wish granting organisation of its kind in Singapore.",
    image: "../../../images/Make-A-Wish-SG.png",
    link: "https://makeawish.org.sg/",
  },
  {
    id: 3,
    name: "Food from the Heart",
    description:
      "Food from the Heart is a IPC-status food charity that feeds the needy in Singapore. Our food distribution programmes are run with sustainable charity in mind. This means that we are committed to providing continued food security to our beneficiaries for as long as they need it.",
    image: "../../../images/FoodFromTheHeart.png",
    link: "https://www.foodfromtheheart.sg/",
  },
];

export default function VoucherForm() {
  const { query } = useRouter();
  const { id } = query;
  // TODO: After getting id, check whether its a valid voucher code or not

  const onSubmit = () => {
    console.log(id);
  };

  return (
    <div className={styles.formpage}>
      <Paper className={styles.form} elevation={5}>
        <p className={styles.heading}>
          Welcome to Project Giving Coupons, you have received a $10 coupon
          sponsored by an anonymous donor, and the donor would like you to
          choose a charity from the list below for the money to go to.
        </p>
        {/* <Charity 1-6 with a few sentences each + link> */}

        {/* <Our hope donor hopes you would consider donating your money directly to these charities as well> */}
        {/* <* Yes! I intend to donate money to these charities> */}
        {/* <No> */}
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
        <button onClick={onSubmit}>click</button>
      </Paper>
    </div>
  );
}
