const CustomRegex = {
  name: /^[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z]*)?$/,
  number: /^[0-9]+$/,
  floatNumber: /^[0-9]+(\.[0-9]+)?$/,
  phoneNumber: /^\+?(\d{1,4}[-.\s]?){1,3}\d{1,9}$/,
  alphabets: /^[A-za-z]+$/,
  alphabetAndNumbers: /^[A-za-z0-9]+$/,
  website: /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.){1,}[a-zA-Z]{2,}(\/\S*)?$/,
  fullName: /^[A-Za-z]+(['-][A-Za-z]+)*\s[A-Za-z]+(['-][A-Za-z]+)*$/,
  timeFormatRegex: /^(0?[0-9]|[1-9][0-9]+):[0-5][0-9]:[0-5][0-9]$/,
} as const;

export default CustomRegex;
