import Image from "next/image";

const Logo = ({ variant }: { variant: "primary" | "secondary" }) => {
  const pathPrimary = "/img/logo-primary.svg";
  const pathSecondary = "/img/logo-secondary.svg";
  return (
    <Image
      src={variant === "primary" ? pathPrimary : pathSecondary}
      width={139}
      height={24}
      alt="Job Route"
    />
  );
};

export default Logo;
