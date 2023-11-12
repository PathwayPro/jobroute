import Logo from "@/ui/Logo";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="fixed top-0 z-10 flex h-8 w-full items-center justify-between bg-white p-8">
      <Link href="/">
        <Logo variant="primary" />
      </Link>
    </div>
  );
};

export default Navbar;
