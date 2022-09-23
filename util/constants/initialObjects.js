export const initialCampaign = {
  id: 0,
  name: "",
  description: "",
  donor: "",
  voucherAmount: 0,
  numVouchers: 0,
  endDate: "",
  vouchers: [],
  charitiesChosenByDonor: [],
};

export const initialCharity = {
  id: "",
  name: "",
  description: "",
  image: "",
  vouchers: [],
  campaigns: [],
};

export const initialCoupon = {
  id: "",
  campaignId: 0,
  status: "",
  charityId: "",
  amountAdded: "",
  message: "",
  timeSubmitted: "",
  campaign: initialCampaign,
  charity: initialCharity,
};
