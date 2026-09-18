import { VaultGallery } from "@/components/vault/vault-gallery";
import { VaultGate } from "@/components/vault/vault-gate";
import { getPrivateWork } from "@/lib/private-work";
import { isVaultUnlocked } from "@/lib/vault";

export const dynamic = "force-dynamic";

export default async function VaultPage() {
  const unlocked = await isVaultUnlocked();

  if (!unlocked) {
    return <VaultGate />;
  }

  return <VaultGallery items={getPrivateWork()} />;
}
