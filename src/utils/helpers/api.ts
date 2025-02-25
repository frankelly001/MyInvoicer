type Props<T> = {
  currentArr: T[];
  incomingArr: T[];
};

type IndexableType = {[key: string]: any};

export const mergeAndAppendArrays = <T extends IndexableType>(
  {currentArr = [], incomingArr = []}: Props<T>,
  key: keyof T,
) => {
  const incomingMap = new Map(incomingArr.map(item => [item[key], item]));
  const currentIds = new Set(currentArr.map(item => item[key]));

  const mergedArr = currentArr.map(item => incomingMap.get(item[key]) || item);

  incomingArr.forEach(item => {
    if (!currentIds.has(item[key])) {
      mergedArr.push(item);
    }
  });

  return mergedArr;
};
