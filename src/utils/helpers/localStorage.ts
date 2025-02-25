import {MMKV} from 'react-native-mmkv';

const keys = {
  COLOR_MODE: 'COLOR_MODE',
  ACCESS_TOKEN: 'ACCESS_TOKEN',
  USER: 'USER',
};

const storage = new MMKV();

const store = (key: string, value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    storage.set(key, jsonValue);
  } catch (error) {}
};

const get = (key: string) => {
  try {
    const jsonValue = storage.getString(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {}
};

const remove = (key: string) => {
  try {
    storage.delete(key);
  } catch (error) {}
};

const removeAll = () => {
  try {
    storage.clearAll();
  } catch (error) {}
};

const contains = (key: string) => {
  try {
    storage.contains(key);
  } catch (error) {}
};

export default {store, get, remove, removeAll, contains, keys};
