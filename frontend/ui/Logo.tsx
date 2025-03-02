import Image from "next/image";

const Logo = ({ variant }: { variant: "primary" | "secondary" }) => {
  // Get logo paths from env
  const primaryPath = process.env.NEXT_PUBLIC_LOGO_PATH || "/img/logo-primary.svg";
  const secondaryPath = process.env.NEXT_PUBLIC_LOGO_PATH_SECONDARY || "/img/logo-secondary.svg";
  
  return (
    <Image
      src={variant === "primary" ? primaryPath : secondaryPath}
      width={139}
      height={24}
      alt={process.env.NEXT_PUBLIC_APP_NAME || "Logo"}
    />
  );
};

export default Logo;
