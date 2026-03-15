export const EXTRAS_DATA = [
  { id: "sauna", title: "Private sauna", price: 280 },
  { id: "hottub", title: "Hot tube on terrace", price: 200 },
  { id: "late-checkout", title: "Late check-out", price: 100 },
  { id: "firewood", title: "Additional fireplace wood", price: 150 },
] as const;

export function calcExtrasTotal(selectedIds: string[]): number {
  return EXTRAS_DATA.reduce(
    (sum, e) => (selectedIds.includes(e.id) ? sum + e.price : sum),
    0,
  );
}
