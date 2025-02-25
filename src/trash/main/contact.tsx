// const ContactCard: FunctionComponent<{
//   contact: ContactType;
//   onChangeFullname: (text: string) => void;
//   onChangeEmail: (text: string) => void;
//   onChangePhone: (text: string) => void;
//   onChangeAddress: (text: string) => void;
//   resetFields: () => void;
//   closeParentSheet: () => void;
// }> = ({
//   contact,
//   onChangeAddress,
//   onChangeEmail,
//   onChangeFullname,
//   onChangePhone,
//   resetFields,
//   closeParentSheet,
// }) => {
//   const {
//     closeSheet: closePhoneSheet,
//     openSheet: openPhoneSheet,
//     sheetRef: phonesheetRef,
//   } = useSheet();
//   const {
//     closeSheet: closeAddressSheet,
//     openSheet: openAddressSheet,
//     sheetRef: addresssheetRef,
//   } = useSheet();
//   const {
//     closeSheet: closeEmailSheet,
//     openSheet: openEmailSheet,
//     sheetRef: emailsheetRef,
//   } = useSheet();

//   return (
//     <>
//       <AppListButton
//         title={contact.fullName}
//         titleSize={'heading_h5'}
//         onPress={() => {
//           resetFields();
//           onChangeFullname(contact.fullName || '');
//           if (contact.phoneNumbers.length > 1) {
//             openPhoneSheet();
//           } else {
//             onChangePhone(contact.phoneNumbers[0].number);
//             if (contact.emailAddresses.length > 1) {
//               openEmailSheet();
//             } else {
//               onChangeEmail(contact.emailAddresses[0]?.email);
//               if (contact.postalAddresses.length > 1) {
//                 openAddressSheet();
//               } else {
//                 onChangeAddress(contact.postalAddresses[0].formattedAddress);
//               }
//             }
//           }
//         }}
//       />
//       <ContactDetailInputSheet
//         sheetRef={phonesheetRef}
//         closeSheet={closePhoneSheet}
//         data={contact.phoneNumbers.map(el => el?.number)}
//         onChange={selected => {
//           onChangePhone(selected);
//           if (contact.emailAddresses?.length > 1) {
//             openEmailSheet();
//           } else {
//             onChangeEmail(contact?.emailAddresses[0]?.email);
//             if (contact?.postalAddresses.length > 1) {
//               openAddressSheet();
//             } else {
//               onChangeAddress(contact.postalAddresses[0]?.formattedAddress);
//             }
//           }
//         }}
//         Icon={<PhoneIcon />}
//       />
//       <ContactDetailInputSheet
//         sheetRef={emailsheetRef}
//         closeSheet={closeEmailSheet}
//         data={contact.emailAddresses.map(el => el?.email)}
//         onChange={selected => {
//           onChangeEmail(contact.emailAddresses[0]?.email);
//           if (contact.postalAddresses.length > 1) {
//             openAddressSheet();
//           } else {
//             onChangeAddress(selected);
//           }
//         }}
//         Icon={<PhoneIcon />}
//       />
//       <ContactDetailInputSheet
//         sheetRef={addresssheetRef}
//         closeSheet={closeAddressSheet}
//         data={contact.postalAddresses.map(
//           el =>
//             el?.formattedAddress ||
//             `${el?.street}, ${el?.region} ${el?.state}, ${el?.country}`,
//         )}
//         onChange={selected => {
//           onChangeAddress(selected);
//         }}
//         Icon={<PhoneIcon />}
//       />
//     </>
//   );
// };
