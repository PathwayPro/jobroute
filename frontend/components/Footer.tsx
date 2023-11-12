import Logo from "@/ui/Logo";
import Paragraph from "@/ui/Paragraph";

const Footer = () => {
  return (
    <footer
      className="align-center mt-[13.5rem] flex h-[10.3rem] items-center justify-around text-light-color"
      style={{ backgroundColor: "rgba(62, 62, 62, 1)" }}
    >
      <div className="flex content-center justify-between gap-12">
        <Logo variant="secondary" />
        <Paragraph size="medium" weight="regular" className="text-white">
          © 2023 JobRoute. All rights reserved
        </Paragraph>
      </div>
      <div className="flex justify-between gap-8">
        <div className="flex items-center ">
          <Paragraph size="medium" weight="regular" className="text-white">
            Terms & Policies
          </Paragraph>
        </div>
        <div className="flex items-center">
          <Paragraph size="medium" weight="regular" className="text-white">
            Privacy Policy
          </Paragraph>
        </div>
        <div className="flex items-center">
          <Paragraph size="medium" weight="regular" className="text-white">
            Contact
          </Paragraph>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
