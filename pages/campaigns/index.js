import Paper from "@mui/material/Paper"
import CampaignCard from "../../components/CampaignCard"
import styles from "../../styles/Form.module.css"
import { useRouter } from "next/router"
import { auth } from "../../firebase/firebaseApp"
import { useState, useEffect } from "react"
import { useAuthState } from "react-firebase-hooks/auth"

export default function campaignList({ data }) {
  // list of campaigns, query the backend for the campaign data

  const router = useRouter()
  const [campaigns, setCampaigns] = useState([])
  const [user] = useAuthState(auth)

  useEffect(() => {
    if (!user) {
      router.push("/admin/login")
    }

    user?.getIdToken().then((jwt) => {
      fetch("/api/campaigns/", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + jwt,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setCampaigns(data)
        })
    })
  }, [])

  return (
    <div className={styles.formpage}>
      <Paper className={styles.form} elevation={0}>
        {campaigns.map((campaign) => (
          <CampaignCard
            key={campaign.id}
            id={campaign.id}
            name={campaign.name}
            description={campaign.description}
            donor={campaign.donor}
            endDate={campaign.endDate}
            // image={campaign.image}
            // link={campaign.link}
          />
        ))}
      </Paper>
    </div>
  )
}
