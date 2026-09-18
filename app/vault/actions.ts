"use server";

import { redirect } from "next/navigation";
import {
  clearVaultCookie,
  passwordMatches,
  setVaultCookie,
  vaultConfigured,
} from "@/lib/vault";

export type VaultActionState = { ok: false } | null;

export async function unlockVault(
  _prev: VaultActionState,
  formData: FormData,
): Promise<VaultActionState> {
  if (!vaultConfigured()) return { ok: false };

  const password = String(formData.get("password") ?? "");
  if (!passwordMatches(password)) return { ok: false };

  await setVaultCookie();
  redirect("/vault");
}

export async function lockVault() {
  await clearVaultCookie();
  redirect("/vault");
}
