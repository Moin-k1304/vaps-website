import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - VAPS Group",
  description: "Learn about VAPS Group, a digital innovation company delivering excellence evolved for over 2 decades.",
};

export default function AboutNewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

