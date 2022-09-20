import Paper from '@mui/material/Paper'
import CharityCard from '../../../components/CharityCard'
import Typography from '@mui/material/Typography'
import styles from '../../../styles/Form.module.css'

export default function Campaign ({ data }) {
  const onSubmit = () => {
    console.log(id)
  }

  const campaign = data

  return (
    <div className={styles.formpage}>
      <Paper className={styles.form} elevation={0}>
        <Typography gutterBottom variant='h5' component='div'>
          {`Campaign Name: ${campaign.name}`}
        </Typography>
        <Typography gutterBottom variant='h5' component='div'>
          {`Donor: ${campaign.donor}`}
        </Typography>
        <Typography gutterBottom variant='h5' component='div'>
          {`${campaign.endDate} left`}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {`Description: ${campaign.description}`}
        </Typography>

        {campaign.charitiesChosenByDonor.map(charity => (
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

export async function getServerSideProps (context) {
  const id = context.params.id
  const res = await fetch(process.env.URL + `/api/campaigns/` + id)
  const data = await res.json()
  return { props: { data } }
}
