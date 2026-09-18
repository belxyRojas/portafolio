import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Private archive",
  description: "Invitation-only client work.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function VaultLayout({ children }: LayoutProps<"/vault">) {
  return children;
}
