import Paragraph from "@/ui/Paragraph";
import Card from "./Card";
import { InfoMinimized } from "./MinimizedCards";
import { RoadmapCardProps } from "./types";

const InfoCard = ({
  callback,
  data,
  hasError,
  isLoading,
}: RoadmapCardProps) => {
  return (
    <Card
      key="info"
      type="info"
      isLoading={isLoading}
      minimizedContent={<InfoMinimized {...data} />}
      hasError={hasError}
      callback={callback}
    >
      <div className="grid grid-cols-2 gap-6 self-center">
        <div className="min-h-[100px] rounded-xl bg-light-gray p-6">
          <Paragraph className="mb-2" weight="bold">
            Salary
          </Paragraph>
          {data.salary.map((content: string, index: number) => (
            <Paragraph key={content}>
              {index === data.salary.length - 1 && "*"} {content}
            </Paragraph>
          ))}
        </div>

        <div className="min-h-[150px] rounded-xl bg-light-gray p-6">
          <Paragraph className="mb-2" weight="bold">
            Degree
          </Paragraph>
          <Paragraph>{data.Degree}</Paragraph>
        </div>

        <div className="min-h-[150px] rounded-xl bg-light-gray p-6">
          <Paragraph className="mb-2" weight="bold">
            Work
          </Paragraph>
          {data.Work.map((content: string) => (
            <Paragraph key={content} className="mb-1">
              {content}
            </Paragraph>
          ))}
        </div>

        <div className="min-h-[150px] rounded-xl bg-light-gray p-6">
          <Paragraph className="mb-2" weight="bold">
            Credential Validation
          </Paragraph>
          <Paragraph>{data["Credential Validation"]}</Paragraph>
        </div>

        <div className="min-h-[150px] rounded-xl bg-light-gray p-6">
          <Paragraph className="mb-2" weight="bold">
            Language Proficiency
          </Paragraph>
          <Paragraph>{data["Language Proficiency"]}</Paragraph>
        </div>
      </div>
    </Card>
  );
};

export default InfoCard;
