import Paragraph from "@/ui/Paragraph";
import Card from "./Card";

export interface Field {
  title: string;
  desc: string;
}

interface RoadmapProps {
  overview: string;
  overviewLoader: boolean;
  info: InfoProps[];
  infoLoader: boolean;
  skills: InfoProps[];
  skillsLoader: boolean;
  education: RoadmapItem;
  educationLoader: boolean;
  qualification: RoadmapItem;
  qualificationLoader: boolean;
  networking: RoadmapItem;
  networkingLoader: boolean;
}

interface RoadmapItem {
  title: string;
  content: {
    title: string;
    desc: string;
  }[];
}

interface InfoProps {
  title: string;
  content: string[];
}

const InfoMinimized = (info: InfoProps[]) => {
  return (
    <div className='grid grid-cols-2 gap-2 h-[180px]'>
      {info.map((field: InfoProps) => (
        <div className='flex flex-col bg-light-gray rounded-xl p-2 h-[80px] line-clamp-1' key={field.title}>
          <p className="text-sm font-bold">{field.title}</p>
          {field.content.map((content: string) => (
            <p className='text-xs line-clamp-1' key={content}>{content}</p>
          ))}
        </div>
      ))}
    </div>
  )
}

const TextContentMinimized = (info: { title: string, desc: string }[]) => {
  return (
    info.map((field: Field) => (
      <div key={field.title}>
        <Paragraph className='mb-1' weight='bold'>{field.title}</Paragraph>
        <Paragraph className='mb-2'>{field.desc}</Paragraph>
      </div>
    ))
  )
}
const RoadmapCards = ({
  overview,
  overviewLoader,
  skills,
  skillsLoader,
  info,
  infoLoader,
  education,
  educationLoader,
  qualification,
  qualificationLoader,
  networking,
  networkingLoader
}: RoadmapProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-evenly gap-8">
      <Card type="overview" isLoading={overviewLoader}>
        <Paragraph>
          {overview}
        </Paragraph>
      </Card>
      <Card type="info" color="white" isLoading={infoLoader} minimizedContent={InfoMinimized(info)}>
        <div className="grid grid-cols-2 gap-6">
          {info.map((field: InfoProps) => (
            <div className='bg-light-gray rounded-xl p-6 min-h-[200px]' key={field.title}>
              <Paragraph className='mb-2' weight='bold'>{field.title}</Paragraph>
              {field.content.map((content: string) => (
                <Paragraph key={content}>{content}</Paragraph>
              ))}
            </div>
          ))
          }
        </div>
      </Card>
      <Card type="skills" color="brown" isLoading={skillsLoader}>
        <div className="grid grid-cols-2 gap-6">
          {skills.map((field: InfoProps) => (
            <div key={field.title}>
              <Paragraph className='mb-2' weight='bold'>{field.title}</Paragraph>
              {field.content.map((content: string) => (
                <Paragraph className='mb-1 line-clamp-1' key={content}>• {content}</Paragraph>
              ))}
            </div>
          ))
          }
        </div>
      </Card>
      <Card type="education" color='brown' isLoading={educationLoader} minimizedContent={TextContentMinimized(education.content)}>
        <div className="flex flex-col justify-around">
          {education.content.map((field: Field) => (
            <div key={field.title}>
              <Paragraph className='mb-1' weight='bold'>{field.title}</Paragraph>
              <Paragraph className='mb-2'>{field.desc}</Paragraph>
            </div>
          ))
          }
        </div>
      </Card>
      <Card type="certification" isLoading={qualificationLoader} minimizedContent={TextContentMinimized(qualification.content)}>
        <div className="flex flex-col justify-around">
          {qualification.content.map((field: Field) => (
            <div key={field.title}>
              <Paragraph className='mb-1' weight='bold'>{field.title}</Paragraph>
              <Paragraph className='mb-2'>{field.desc}</Paragraph>
            </div>
          ))
          }
        </div>
      </Card>
      <Card type="networking" color='white' isLoading={networkingLoader} minimizedContent={TextContentMinimized(networking.content)}>
        <div className="flex flex-col justify-around">
          {networking.content.map((field: Field) => (
            <div key={field.title}>
              <Paragraph className='mb-1' weight='bold'>{field.title}</Paragraph>
              <Paragraph className='mb-2'>{field.desc}</Paragraph>
            </div>
          ))
          }
        </div>
      </Card>
    </div>
  )
}

export default RoadmapCards;