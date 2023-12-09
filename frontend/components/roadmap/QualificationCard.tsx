import Paragraph from "@/ui/Paragraph";
import Card from "./Card";
import { QualificationMinimized } from "./MinimizedCards";
import { RoadmapCardProps } from "./types";

const QualificationCard = ({
  callback,
  data,
  hasError,
  isLoading,
}: RoadmapCardProps) => {
  return (
    <Card
      key="qualification"
      type="qualification"
      isLoading={isLoading}
      minimizedContent={<QualificationMinimized {...data} />}
      hasError={hasError}
      callback={callback}
    >
      <Paragraph weight="bold" size="large">
        {data.regulated === true ? "Regulated profession" : null}
        {data.regulated === false ? "Non-regulated profession" : null}
      </Paragraph>
      <Paragraph className="mb-2">{data.title}:</Paragraph>
      <div className="grid grid-cols-2 gap-6">
        {data.content?.map((field: { title: string; desc: string }) => (
          <div
            className="min-h-[150px] rounded-xl bg-light-gray p-6"
            key={field.title}
          >
            <Paragraph className="mb-2" weight="bold">
              {field.title}
            </Paragraph>
            <Paragraph className="mb-2">{field.desc}</Paragraph>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default QualificationCard;
