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
  // Flatten the nested array structure and provide fallback if needed
  const skills = Array.isArray(data) 
    ? data.flatMap(skillGroup => skillGroup) 
    : [];

  return (
    <Card
      key="combinedSkills"
      type="combinedSkills"
      isLoading={isLoading}
      minimizedContent={<SkillsMinimized skills={data} />}
      hasError={hasError}
      callback={callback}
    >
      <div className="grid grid-cols-2 gap-8">
        {skills.map((category: Skills, categoryIndex: number) => (
          <div key={`${categoryIndex}`}>
            <Paragraph className="mb-2" weight="bold">
              {category.title}
            </Paragraph>
            {category.content?.map((content: string, index: number) => (
              <Paragraph 
                className="mb-1" 
                key={`${categoryIndex}-${index}`}
              >
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
