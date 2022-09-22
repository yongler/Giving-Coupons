import Paper from '@mui/material/Paper'
import CampaignCard from '../../components/CampaignCard'
import styles from '../../styles/Form.module.css'

export default function campaignList({ data }) {
  // list of campaigns, query the backend for the campaign data
  const campaigns = data
  console.log(data)

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

export async function getServerSideProps() {
  const res = await fetch(process.env.URL + `/api/campaigns`)
  const data = await res.json()
  return { props: { data } }
}
