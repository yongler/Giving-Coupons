import Paper from "@mui/material/Paper"
import CharityCard from "../../../components/CharityCard"
import Typography from "@mui/material/Typography"
import styles from "../../../styles/Form.module.css"
import { initialCampaign } from "../../../util/constants/initialObjects"
import { useRouter } from "next/router"
import { auth } from "../../../firebase/firebaseApp"
import { useState, useEffect } from "react"
import { useAuthState } from "react-firebase-hooks/auth"

export default function Campaign() {
  const onSubmit = () => {
    console.log(id)
  }

  const { id } = useRouter().query
  const [campaign, setCampaign] = useState(initialCampaign)
  const [user] = useAuthState(auth)

  useEffect(() => {
    if (!user) {
      router.push("/admin/login")
    }

    user?.getIdToken().then((jwt) => {
      fetch("/api/campaigns/" + id, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + jwt,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setCampaign(data)
        })
    })
  }, [])

  function getDaysLeft(endDate) {
    return Math.floor(
      (Date.parse(endDate) - new Date()) / (1000 * 60 * 60 * 24)
    )
  }

  return (
    <div className={styles.formpage}>
      <Paper className={styles.form} elevation={0}>
        <Typography gutterBottom variant="h5" component="div">
          {`Campaign Name: ${campaign.name}`}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          {`Donor: ${campaign.donor}`}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          {`${getDaysLeft(campaign.endDate)} days left`}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {`Description: ${campaign.description}`}
        </Typography>

        {campaign.charitiesChosenByDonor.map((charity) => (
          <CharityCard
            key={charity.id}
            id={charity.id}
            name={charity.name}
            description={charity.description}
            image={charity.image}
            link={charity.link}
          />
        ))}
        <button onClick={onSubmit}>Donate</button>
      </Paper>
    </div>
  )
}
