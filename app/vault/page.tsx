import { VaultGallery } from "@/components/vault/vault-gallery";
import { getPrivateWork } from "@/lib/private-work";

export default function VaultPage() {
  return <VaultGallery items={getPrivateWork()} />;
}
