'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Home' },
    { href: '/profile', label: 'Profile' },
    { href: '/recipes', label: 'All Recipes' },
    { href: '/saved', label: 'Saved Recipes' },
    { href: '/feedback', label: 'Feedback' },
    { href: '/explore', label: 'Explore' },
    { href: '/about', label: 'About Us' },
    { href: '/login', label: 'Logout' },
  ];

  return (
    <nav className="navbar">
      <div style={{ marginRight: 'auto', fontWeight: 'bold', fontSize: '1.25rem' }}>
        Smart Recipe
      </div>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={pathname === link.href ? 'filter-btn active' : 'filter-btn'}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
