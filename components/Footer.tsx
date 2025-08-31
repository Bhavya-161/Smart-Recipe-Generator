'use client';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div style={{ marginRight: 'auto', fontWeight: 'bold' }}>Smart Recipe</div>
      <div>
        <Link href="/about">About Us</Link>
        <Link href="/contact">Contact</Link>
      </div>
    </footer>
  );
}
