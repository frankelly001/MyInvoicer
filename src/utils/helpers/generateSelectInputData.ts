export const generateSelectInputData = (data: string[]) => {
  return data.map(el => {
    return {label: el, value: el};
  });
};
