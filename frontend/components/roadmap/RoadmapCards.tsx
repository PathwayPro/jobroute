import Paragraph from "@/ui/Paragraph";
import Card from "./Card";
import { useEffect, useState } from "react";
import fetchRoadmap from "@/fetch/fetchRoadmap";

export interface Field {
  title: string;
  desc: string;
}

interface RoadmapCardProps {
  profession: string;
  province: string;
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
    <div className="grid h-[180px] grid-cols-2 gap-2">
      {info.map((field: InfoProps) => (
        <div
          className="line-clamp-1 flex h-[80px] flex-col rounded-xl bg-light-gray p-2"
          key={field.title}
        >
          <p className="text-sm font-bold">{field.title}</p>
          {field.content.map((content: string) => (
            <p className="line-clamp-1 text-xs" key={content}>
              {content}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
};

const TextContentMinimized = (info: { title: string; desc: string }[]) => {
  return info.map((field: Field) => (
    <div key={field.title}>
      <Paragraph className="mb-1" weight="bold">
        {field.title}
      </Paragraph>
      <Paragraph className="mb-2">{field.desc}</Paragraph>
    </div>
  ));
};

const RoadmapCards = ({ profession, province }: RoadmapCardProps) => {
  const initCard = { title: "", content: [] };
  const [education, setEducation] = useState<RoadmapItem>(initCard);
  const [educationLoader, setEducationLoader] = useState(true);

  const [qualification, setQualification] = useState<RoadmapItem>(initCard);
  const [qualificationLoader, setQualificationLoader] = useState(true);

  const [networking, setNetworking] = useState<RoadmapItem>(initCard);
  const [networkingLoader, setNetworkingLoader] = useState(true);

  const [overview, setOverview] = useState<string>("");
  const [overviewLoader, setOverviewLoader] = useState<boolean>(true);

  const [info, setInfo] = useState<InfoProps[]>([]);
  const [infoLoader, setInfoLoader] = useState(true);

  const [skills, setSkills] = useState<InfoProps[]>([]);
  const [skillsLoader, setSkillsLoader] = useState(true);

  const [counter, setCounter] = useState(0);

  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    const getData = async () => {
      if (!fetched && profession && province) {
        const getPrompts = async (
          setter: any,
          endpoint: string,
          loader: any,
        ) => {
          try {
            const response = await fetchRoadmap(endpoint, profession, province);
            setter(JSON.parse(response));
            loader(false);
          } catch (error: any) {
            if (counter < 8) {
              getPrompts(setter, endpoint, loader);
              setCounter(counter + 1);
              console.warn(`Another attempt to call the ${endpoint} prompt`);
            }
          }
        };

        try {
          getPrompts(setOverview, "overview", setOverviewLoader);
          getPrompts(setInfo, "info", setInfoLoader);
          getPrompts(setEducation, "education", setEducationLoader);
          getPrompts(setQualification, "qualification", setQualificationLoader);
          getPrompts(setNetworking, "networking", setNetworkingLoader);
          getPrompts(setSkills, "skills", setSkillsLoader);
          setFetched(true);
        } catch (error) {
          throw error;
        }
      }
    };
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profession, province, fetched]);

  return (
    <div className="grid grid-cols-1 justify-evenly gap-8 md:grid-cols-2 lg:grid-cols-3">
      <Card key="overview" type="overview" isLoading={overviewLoader}>
        <Paragraph>{overview}</Paragraph>
      </Card>
      <Card
        key="info"
        type="info"
        isLoading={infoLoader}
        minimizedContent={InfoMinimized(info)}
      >
        <div className="grid grid-cols-2 gap-6">
          {info.map((field: InfoProps) => (
            <div
              className="min-h-[200px] rounded-xl bg-light-gray p-6"
              key={field.title}
            >
              <Paragraph className="mb-2" weight="bold">
                {field.title}
              </Paragraph>
              {field.content.map((content: string) => (
                <Paragraph key={content}>{content}</Paragraph>
              ))}
            </div>
          ))}
        </div>
      </Card>
      <Card key="skills" type="skills" isLoading={skillsLoader}>
        <div className="grid grid-cols-2 gap-6">
          {skills.map((field: InfoProps) => (
            <div key={field.title}>
              <Paragraph className="mb-2" weight="bold">
                {field.title}
              </Paragraph>
              {field.content.map((content: string) => (
                <Paragraph className="mb-1 line-clamp-1" key={content}>
                  • {content}
                </Paragraph>
              ))}
            </div>
          ))}
        </div>
      </Card>
      <Card
        key="education"
        type="education"
        isLoading={educationLoader}
        minimizedContent={TextContentMinimized(education.content)}
      >
        <div className="flex flex-col justify-around">
          {education.content.map((field: Field) => (
            <div key={field.title}>
              <Paragraph className="mb-1" weight="bold">
                {field.title}
              </Paragraph>
              <Paragraph className="mb-2">{field.desc}</Paragraph>
            </div>
          ))}
        </div>
      </Card>
      <Card
        key="certification"
        type="certification"
        isLoading={qualificationLoader}
        minimizedContent={TextContentMinimized(qualification.content)}
      >
        <div className="flex flex-col justify-around">
          {qualification.content.map((field: Field) => (
            <div key={field.title}>
              <Paragraph className="mb-1" weight="bold">
                {field.title}
              </Paragraph>
              <Paragraph className="mb-2">{field.desc}</Paragraph>
            </div>
          ))}
        </div>
      </Card>
      <Card
        key="networking"
        type="networking"
        isLoading={networkingLoader}
        minimizedContent={TextContentMinimized(networking.content)}
      >
        <div className="flex flex-col justify-around">
          {networking.content.map((field: Field) => (
            <div key={field.title}>
              <Paragraph className="mb-1" weight="bold">
                {field.title}
              </Paragraph>
              <Paragraph className="mb-2">{field.desc}</Paragraph>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default RoadmapCards;
