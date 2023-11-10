import Paragraph from "@/ui/Paragraph"
import { VariantProps, cva } from "class-variance-authority";

interface PercentageCardProps extends VariantProps<typeof percentageCardStyles> {
  percentage: string;
  title: string;
  salary?: string;
  noc: string;
  active?: boolean;
  onClick: () => void;
}

const percentageCardStyles = cva("cursor-pointer flex flex-col h-[201px] min-w-[234px] items-start gap-[10px] p-6 justify-center rounded-xl", {
  variants: {
    active: {
      true: "bg-[#42444D]",
      false: "border-2 border-[#D0D0D0]",
    },
    defaultVariants: {
      active: false,
    },
  },
});

const PercentageCard = ({ percentage, title, salary = '', noc, active = false, onClick }: PercentageCardProps) => {
  return (
    <div onClick={onClick}
      className={percentageCardStyles({ active })}
    >
      <Paragraph className={active ? 'text-white' : 'text-[#242529]'} size="large" weight="bold">{percentage}</Paragraph>
      <Paragraph className={active ? 'text-white' : 'text-[#242529]'} weight="bold">{title}</Paragraph>
      <Paragraph className={active ? 'text-[#F0F0F0]' : ''}>$ {salary}</Paragraph>
      <Paragraph className={active ? 'text-[#F0F0F0]' : ''}>{noc}</Paragraph>
    </div>
  )
}

export default PercentageCard;