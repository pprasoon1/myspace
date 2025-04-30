export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#171d1a] to-[#232b22] text-green-300 py-8 text-center border-t border-white/10">
      <p className="text-sm tracking-wider">
        © {new Date().getFullYear()} Pranay Prasoon. All rights reserved.
      </p>
    </footer>
  );
}
