export const removeDuplicates = (array: any[], key: string) => {
  const uniqueKeys = Array.from(new Set(array.map(item => item[key])));
  const uniqueItems = uniqueKeys.map(uniqueKey => {
    const duplicates = array.filter(item => item[key] === uniqueKey);
    return duplicates[duplicates.length - 1];
  });
  return uniqueItems;
};
