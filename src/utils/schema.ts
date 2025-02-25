import {z} from 'zod';
import CustomRegex from './constants/customRegex';

type ShemaProps = {label: string};

export const nameValidation = ({label}: ShemaProps) =>
  z
    .string({required_error: `${label} is required`})
    .regex(CustomRegex.name, {message: 'Please enter a valid name'});

export const fullNameValidation = ({label}: ShemaProps) =>
  z
    .string({required_error: `${label} is required`})
    .regex(CustomRegex.fullName, {message: 'Please enter a valid name'});

export const phoneNumberValidation = z
  .string({required_error: 'Phone number is required'})
  .min(7, 'Phone number should be at least 11 characters long')
  .regex(CustomRegex.phoneNumber, 'Please enter a valid phone number');

export const emailValidation = z
  .string({required_error: 'Email is required'})
  .email({message: 'Invalid email'});

export const numberValidation = ({label}: ShemaProps) =>
  z.string({required_error: `${label} is required`}).regex(CustomRegex.number, {
    message: `Please enter a valid ${label}`,
  });

export const floatNumberValidation = ({label}: ShemaProps) =>
  z
    .string({required_error: `${label} is required`})
    .regex(CustomRegex.floatNumber, {
      message: `Please enter a valid ${label}`,
    });

export const stringValidation = ({label}: ShemaProps) =>
  z.string({required_error: `${label} is required`});

export const imageFileValidation = ({label}: ShemaProps) =>
  z.object(
    {
      path: z.string().min(3, {message: `${label} path is missing`}),
      mime: z.string().min(3, {message: `${label} mime mime is missing`}),
      name: z.string().min(3, {message: `${label} name is missing`}),
    },
    {required_error: `${label} is required`},
  );
