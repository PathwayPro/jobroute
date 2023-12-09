import Paragraph from "@/ui/Paragraph";
import Card from "./Card";
import { SkillsMinimized } from "./MinimizedCards";
import { RoadmapCardProps, Skills } from "./types";

const SkillsCard = ({
  callback,
  data,
  hasError,
  isLoading,
}: RoadmapCardProps) => {
  return (
    <Card
      key="combinedSkills"
      type="combinedSkills"
      isLoading={isLoading}
      minimizedContent={<SkillsMinimized skills={data} />}
      hasError={hasError}
      callback={callback}
    >
      <div className="grid grid-cols-2 gap-6">
        {data.map((category: Skills) => (
          <div key={category.title}>
            <Paragraph className="mb-2" weight="bold">
              {category.title}
            </Paragraph>
            {category.content.map((content: string) => (
              <Paragraph className="mb-1 line-clamp-1" key={content}>
                • {content}
              </Paragraph>
            ))}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default SkillsCard;
