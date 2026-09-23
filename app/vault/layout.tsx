import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Selected work",
  description: "Live client sites engineered with Off-the-Record.",
};

export default function VaultLayout({ children }: LayoutProps<"/vault">) {
  return children;
}
