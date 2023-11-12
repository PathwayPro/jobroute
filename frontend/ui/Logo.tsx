import Image from "next/image";

const Logo = ({ variant }: { variant: "primary" | "secondary" }) => {
  const style = "min-w-[8.68775rem] h-[1.5rem] bg-no-repeat bg-cover bg-center";
  const pathPrimary = "/img/logo-primary.svg";
  const pathSecondary = "/img/logo-secondary.svg";
  return (
    <div
      className={style}
      style={{ backgroundImage: "url(/img/logo-primary.svg)" }}
    >
      <Image
        src={variant === "primary" ? pathPrimary : pathSecondary}
        width={139}
        height={24}
        alt="Job Route"
      />
    </div>
  );
};

export default Logo;
