import { createHash, createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const VAULT_COOKIE = "bk_vault";
const TOKEN_PAYLOAD = "bk-vault-v1";

function expectedPassword() {
  return process.env.PRIVATE_WORK_PASSWORD ?? "";
}

export function vaultConfigured() {
  return expectedPassword().length >= 4;
}

export function passwordMatches(input: string) {
  const expected = expectedPassword();
  if (!expected) return false;
  const a = createHash("sha256").update(input.normalize("NFKC")).digest();
  const b = createHash("sha256").update(expected.normalize("NFKC")).digest();
  return timingSafeEqual(a, b);
}

export function vaultToken() {
  return createHmac("sha256", expectedPassword()).update(TOKEN_PAYLOAD).digest("hex");
}

export async function isVaultUnlocked() {
  if (!vaultConfigured()) return false;
  const jar = await cookies();
  const value = jar.get(VAULT_COOKIE)?.value;
  if (!value) return false;
  const expected = vaultToken();
  const a = Buffer.from(value);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

const cookieBase = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
};

export async function setVaultCookie() {
  const jar = await cookies();
  jar.set(VAULT_COOKIE, vaultToken(), {
    ...cookieBase,
    maxAge: 60 * 60 * 24 * 14,
  });
}

export async function clearVaultCookie() {
  const jar = await cookies();
  jar.set(VAULT_COOKIE, "", {
    ...cookieBase,
    maxAge: 0,
  });
}
