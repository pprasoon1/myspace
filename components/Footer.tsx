export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-zinc-500 py-8 text-center border-t border-zinc-900">
      <p className="text-sm tracking-wider">
        © {new Date().getFullYear()} Pranay Prasoon. All rights reserved.
      </p>
    </footer>
  );
}
