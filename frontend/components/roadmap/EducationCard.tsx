import Paragraph from "@/ui/Paragraph";
import Card from "./Card";
import { EducationMinimized } from "./MinimizedCards";
import { RoadmapCardProps } from "./types";

const EducationCard = ({
  callback,
  data,
  hasError,
  isLoading,
}: RoadmapCardProps) => {
  return (
    <Card
      key="education"
      type="education"
      isLoading={isLoading}
      minimizedContent={<EducationMinimized {...data} />}
      hasError={hasError}
      callback={callback}
    >
      <div className="grid grid-cols-2 gap-6">
        {data.content?.map((field: { title: string; desc: string }) => (
          <div
            className="min-h-[100px] rounded-xl bg-light-gray p-6"
            key={field.title}
          >
            <Paragraph className="mb-1" weight="bold">
              {field.title}
            </Paragraph>
            <Paragraph className="mb-2">{field.desc}</Paragraph>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default EducationCard;
