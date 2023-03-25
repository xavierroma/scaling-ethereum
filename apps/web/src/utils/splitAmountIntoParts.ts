export function splitFiatAmountIntoParts(amount: number, parts: number): number[] {
  const splitAmount = amount / parts;
  const splitAmountRounded = Math.round(splitAmount * 100) / 100;
  const missing = amount - splitAmountRounded * parts;
  const splitAmounts = [];
  for (let i = 0; i < parts; i++) {
    splitAmounts.push(splitAmount);
  }
  splitAmounts[0] += missing;
  return splitAmounts;
}
