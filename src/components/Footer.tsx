// components/Footer.tsx
export default function Footer() {
  return (
    <footer className="w-full bg-ff7-panel border-t border-ff7-border text-xs text-white text-center py-2 opacity-40">
      <p>
        &copy; {new Date().getFullYear()} Alexander Mak. All rights reserved.
      </p>
      <p className="mt-1">
        Inspired by <span className="font-bold">Final Fantasy VII</span> menus.
      </p>
    </footer>
  );
}
