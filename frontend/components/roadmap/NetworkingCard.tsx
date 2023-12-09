import Paragraph from "@/ui/Paragraph";
import Card from "./Card";
import { NetworkingMinimized } from "./MinimizedCards";
import { RoadmapCardProps } from "./types";

const NetworkingCard = ({
  callback,
  data,
  hasError,
  isLoading,
}: RoadmapCardProps) => {
  return (
    <Card
      key="networking"
      type="networking"
      isLoading={isLoading}
      minimizedContent={<NetworkingMinimized {...data} />}
      callback={callback}
      hasError={hasError}
    >
      <div className="grid grid-cols-2 gap-6">
        {data.content?.map(
          (field: { name: string; services: string[]; website: string }) => (
            <div
              className="min-h-[200px] rounded-xl bg-light-gray p-6"
              key={field.name}
            >
              <Paragraph className="mb-2" weight="bold">
                {field.name}
              </Paragraph>
              {field.services.map((content: string) => (
                <Paragraph key={content}>• {content}</Paragraph>
              ))}
              <Paragraph className="mt-2">
                <a
                  href={field.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit the website
                </a>
              </Paragraph>
            </div>
          ),
        )}
      </div>
    </Card>
  );
};

export default NetworkingCard;
