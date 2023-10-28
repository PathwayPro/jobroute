import { NumberBadge } from "./Elements";
import { VariantProps, cva } from "class-variance-authority";
import Paragraph from "@/ui/Paragraph";

interface CardProps extends VariantProps<typeof cardStyles> {
  content: {
    number: string;
    title: string;
  },
  hoveredContent: {
    number: string;
    description: string;
  },
  className?: string;
}

const cards = [
  {
    number: '01',
    title: 'Provide your experience and interests',
    description: 'Provide some information about yourself and the profession you want to pursue'
  },
  {
    number: '02',
    title: 'Read full info about chosen work',
    description: 'Get complete information on what you need to prepare before applying for a job'
  },
  {
    number: '03',
    title: 'Print out a task list or make a task tracker on the site',
    description: 'Print or download complete information about your chosen profession, and cover all necessary tasks'
  }
]

const cardStyles = cva("w-[244px] h-[210px] flex flex-col justify-between p-6 border-2 border-zinc-700 rounded-2xl shadow-md transition-transform transform scale-100 group-hover:scale-100", {
  variants: {
    intent: {
      primary: "bg-light-brown",
      secondary: "bg-white",
      tertiary: "bg-light-gray",
    },
  },
});

const Card = ({ content, hoveredContent, intent, className }: CardProps) => {
  return (
    <div className="relative group">
      <div
        className={cardStyles({ className, intent })}
      >
        <NumberBadge number={content.number} />
        <h3 className="leading-[17.60px]">{content.title}</h3>
      </div>
      <div className="w-[244px] h-[210px] p-6 bg-black text-white opacity-0 group-hover:opacity-100 absolute inset-0 rounded-2xl transition-opacity">
        <div className="flex flex-col items-start justify-between h-full text-white">
          <Paragraph className="text-white" size="medium" weight="bold">{hoveredContent.number}</Paragraph>
          <Paragraph size="medium" className="text-white">{hoveredContent.description}</Paragraph>
        </div>
      </div>
    </div>
  );
};

const CardsContainer = () => {
  return (
    <div className="flex justify-center items-center mt-6">
      <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-2 gap-4">
            {/* First card in the top row */}
            <div className="lg:col-span-2 w-[244px]">
              <Card
                content={{
                  number: cards[0].number,
                  title: cards[0].title
                }}
                hoveredContent={{
                  number: cards[0].number,
                  description: cards[0].description
                }}
                intent="primary"
              />
            </div>
            {/* Second card in the bottom-left cell */}
            <div>
              <Card
                content={{
                  number: cards[1].number,
                  title: cards[1].title
                }}
                hoveredContent={{
                  number: cards[1].number,
                  description: cards[1].description
                }}
                intent="secondary"
              />
            </div>
            {/* Third card in the bottom-right cell */}
            <div>
              <Card
                content={{
                  number: cards[2].number,
                  title: cards[2].title
                }}
                hoveredContent={{
                  number: cards[2].number,
                  description: cards[2].description
                }}
                intent="tertiary"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardsContainer;