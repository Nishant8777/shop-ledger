import { LedgerEntry } from "../types/LedgerEntry";

const KEY = "ledgerData";

export const getLedgerData = (): LedgerEntry[] => {
  const data = localStorage.getItem(KEY);
  return data ? JSON.parse(data) : [];
};

export const saveLedgerData = (entries: LedgerEntry[]) => {
  localStorage.setItem(KEY, JSON.stringify(entries));
};