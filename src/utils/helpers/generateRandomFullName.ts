export function generateRandomFullName() {
  const firstNames = [
    'John',
    'Jane',
    'Michael',
    'Emily',
    'David',
    'Sarah',
    'Zucci',
    'Franklyn',
    'Sasha',
  ];
  const lastNames = [
    'Smith',
    'Johnson',
    'Williams',
    'Brown',
    'Jones',
    'Miller',
    'Okeke',
    'Eze',
    'Obi',
  ];

  const randomFirstName =
    firstNames[Math.floor(Math.random() * firstNames.length)];
  const randomLastName =
    lastNames[Math.floor(Math.random() * lastNames.length)];

  return `${randomFirstName} ${randomLastName}`;
}
