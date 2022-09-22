import ProductFAQ from '../components/ProductFAQ'
import ProductHero from '../components/ProductHero'
import ProductHowItWorks from '../components/ProductHowItWorks'

export default function Home() {
  return (
    <div>
      <ProductHero />
      <ProductHowItWorks />
      <ProductFAQ />

      {/* <ProductCTA /> */}
      {/* <ProductSmokingHero /> */}
      {/* <AppFooter /> */}
    </div>
  )
}
