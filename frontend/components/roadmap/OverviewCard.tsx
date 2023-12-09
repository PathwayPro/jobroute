import Paragraph from "@/ui/Paragraph";
import Card from "./Card";
import { OverviewMinimized } from "./MinimizedCards";
import { RoadmapCardProps } from "./types";

const OverviewCard = ({
  callback,
  data,
  hasError,
  isLoading,
}: RoadmapCardProps) => {
  return (
    <Card
      key="overview"
      type="overview"
      isLoading={isLoading}
      minimizedContent={<OverviewMinimized {...data} />}
      callback={callback}
      hasError={hasError}
    >
      <Paragraph>{data.content}</Paragraph>
    </Card>
  );
};

export default OverviewCard;
