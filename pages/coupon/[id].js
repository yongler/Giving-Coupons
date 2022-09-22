import * as React from "react";
import Coupon from "../../components/Coupon";
import { useRouter } from "next/router";
import { auth } from "../../firebase/firebaseApp";
import { useAuthState } from "react-firebase-hooks/auth";
import { initialCoupon } from "../../util/constants/initialObjects";

export default function CouponView() {
  const { id } = useRouter().query;
  const [coupon, setCoupon] = React.useState(initialCoupon);
  const [user] = useAuthState(auth);

  React.useEffect(() => {
    user.getIdToken().then((jwt) => {
      fetch("/api/vouchers/" + id, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + jwt,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setCoupon(data);
        });
    });
  }, []);

  return <Coupon coupon={coupon} />;
}
