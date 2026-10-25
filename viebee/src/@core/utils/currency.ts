export const formatVND = (amount: number): string => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(amount);
};

export const calculatePayoutBreakdown = (totalPrice: number, commissionRate: number = 0.12) => {
  const platformFee = Math.round(totalPrice * commissionRate);
  const hostPayout = totalPrice - platformFee;
  return {
    totalPrice,
    commissionRate,
    platformFee,
    hostPayout,
  };
};
