import Coupon from '../../components/Coupon'

export default function CouponView({ data }) {
  return <Coupon coupon={data} />
}

export async function getServerSideProps(context) {
  const id = context.params.id
  const res = await fetch(process.env.URL + `/api/vouchers/` + id)
  const voucher = await res.json()
  return { props: { data: voucher } }
}
