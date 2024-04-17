import { customAlphabet } from "nanoid";

const alphabet = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-";
const length = 14;

const nanoId = customAlphabet(alphabet, length);

export const generateId = () => nanoId();
