import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us - VAPS Technosoft | Get In Touch',
  description: 'Contact VAPS Technosoft for innovative education technology solutions. Reach out to transform your educational institution with AI-powered platforms.',
};

export default function ContactUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
