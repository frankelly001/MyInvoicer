export function calculateNumberOfPages(
  totalData: number,
  dataPerPage: number,
): number {
  return Math.ceil(totalData / dataPerPage);
}
