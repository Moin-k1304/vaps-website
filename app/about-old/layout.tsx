import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us - VAPS Technosoft | 25 Years of Excellence',
  description: 'Learn about VAPS Technosoft\'s 25-year journey in transforming education through innovative AI-powered technology solutions and digital campus infrastructure.',
};

export default function AboutUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
