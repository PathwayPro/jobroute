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
          © {new Date().getFullYear()} {process.env.NEXT_PUBLIC_APP_NAME}. All rights reserved
        </Paragraph>
      </div>
      <div className="flex justify-between gap-8">
        <div className="flex items-center ">
          <a href={process.env.NEXT_PUBLIC_TERMS_OF_SERVICE_URL} target="_blank" rel="noopener">
            <Paragraph size="medium" weight="regular" className="text-white">
              Terms & Policies
            </Paragraph>
          </a>
        </div>
        <div className="flex items-center">
          <a href={process.env.NEXT_PUBLIC_PRIVACY_POLICY_URL} target="_blank" rel="noopener">
            <Paragraph size="medium" weight="regular" className="text-white">
              Privacy Policy
            </Paragraph>
          </a>
        </div>
        <div className="flex items-center">
          <a href={process.env.NEXT_PUBLIC_ABOUT_US_URL} target="_blank" rel="noopener">
            <Paragraph size="medium" weight="regular" className="text-white">
              About Us
            </Paragraph>
          </a>
        </div>
        <div className="flex items-center">
          <a href={process.env.NEXT_PUBLIC_CONTACT_URL} target="_blank" rel="noopener">
            <Paragraph size="medium" weight="regular" className="text-white">
              Contact
            </Paragraph>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
