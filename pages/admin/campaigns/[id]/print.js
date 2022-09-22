import * as React from "react";
import Coupon from "../../../../components/Coupon";
import { useRouter } from "next/router";
import { auth } from "../../../../firebase/firebaseApp";
import { useAuthState } from "react-firebase-hooks/auth";
import { initialCampaign } from "../../../../util/constants/initialObjects";

export default function CouponView() {
  const { id } = useRouter().query;
  const [campaign, setCampaign] = React.useState(initialCampaign);
  const [user] = useAuthState(auth);

  React.useEffect(() => {
    user.getIdToken().then((jwt) => {
      fetch("/api/campaigns/" + id, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + jwt,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setCampaign(data);
        });
    });
  }, []);

  const { vouchers, endDate, voucherAmount } = campaign;

  return vouchers.map((voucher) => {
    voucher.campaign = { endDate, voucherAmount };
    return <Coupon coupon={voucher} key={voucher.id} />;
  });
}
