export const getCurrencySymbol = (currency: string | undefined = '') => {
  const regex = /\((.*?)\)/; // Regular expression to match text within parentheses
  const match = regex.exec(currency);

  if (match && match.length > 1) {
    return match[1].trim(); // Extracted text/symbol within the brackets
  }

  return currency; // Return inputString if no match is found
};
