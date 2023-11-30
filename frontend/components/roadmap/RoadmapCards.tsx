import Paragraph from "@/ui/Paragraph";
import Card from "./Card";
import { useEffect, useState } from "react";
import { fetchRoadmap } from "@/fetch/fetchRoadmap";
import { capitalizeWords } from "@/utils/utils";
import {
  EducationProps,
  NetworkingProps,
  QualificationProps,
  SkillProps,
  InfoProps,
} from "./types";

interface RoadmapCardProps {
  profession: string;
  province: string;
}

const InfoMinimized = ({
  salary,
  "Credential Validation": credentialValidation,
  Degree: degree,
  Work: work,
}: InfoProps) => {
  return (
    <div className="grid h-[180px] grid-cols-2 gap-2">
      <div className="line-clamp-1 flex h-[80px] flex-col rounded-xl bg-light-gray p-2">
        <p className="text-sm font-bold">Salary</p>
        <p className="line-clamp-1 text-xs">{salary}</p>
      </div>
      <div className="line-clamp-1 flex h-[80px] flex-col rounded-xl bg-light-gray p-2">
        <p className="text-sm font-bold">Degree</p>
        <p className="line-clamp-1 text-xs">{degree}</p>
      </div>
      <div className="line-clamp-1 flex h-[80px] flex-col rounded-xl bg-light-gray p-2">
        <p className="text-sm font-bold">Work</p>
        <p className="line-clamp-1 text-xs">{work}</p>
      </div>
      <div className="line-clamp-1 flex h-[80px] flex-col rounded-xl bg-light-gray p-2">
        <p className="text-sm font-bold">Validate Credential</p>
        <p className="line-clamp-1 text-xs">{credentialValidation}</p>
      </div>
    </div>
  );
};

// TODO: include minimized content for all cards
const TextContentMinimized = (content: { title: string; desc: string }[]) => {
  return content.map((field) => (
    <>
      <Paragraph className="mb-1" weight="bold">
        {field.title}
      </Paragraph>
      <Paragraph className="mb-2">{field.desc}</Paragraph>
    </>
  ));
};

const RoadmapCards = ({ profession, province }: RoadmapCardProps) => {
  const initCard = { title: "", content: [] };
  const initInfo = {
    salary: [],
    "Credential Validation": "",
    Degree: "",
    Work: [],
    "Language Proficiency": "",
  };
  const initQualification = { regulated: false, title: "", content: [] };
  const [education, setEducation] = useState<EducationProps>(initCard);
  const [educationLoader, setEducationLoader] = useState(true);

  const [qualification, setQualification] =
    useState<QualificationProps>(initQualification);
  const [qualificationLoader, setQualificationLoader] = useState(true);

  const [networking, setNetworking] = useState<NetworkingProps>(initCard);
  const [networkingLoader, setNetworkingLoader] = useState(true);

  const [overview, setOverview] = useState<{ content: string }>({
    content: "",
  });
  const [overviewLoader, setOverviewLoader] = useState<boolean>(true);

  const [info, setInfo] = useState<InfoProps>(initInfo);
  const [infoLoader, setInfoLoader] = useState(true);

  const [combinedSkills, setCombinedSkills] = useState<SkillProps[]>([]);
  const [combinedSkillsLoader, setCombinedSkillsLoader] = useState(true);

  const getPrompts = async (setter: any, endpoint: string, loader: any) => {
    try {
      const response = await fetchRoadmap(endpoint, profession, province);
      setter(response);
      loader(false);
    } catch (error: any) {
      console.log("error", error);
      console.warn(`Another attempt to call the ${endpoint} prompt`);
    }
  };

  useEffect(() => {
    if (profession && province) {
      try {
        getPrompts(setOverview, "overview", setOverviewLoader);
        getPrompts(setInfo, "info", setInfoLoader);
        getPrompts(setEducation, "education", setEducationLoader);
        getPrompts(setQualification, "qualification", setQualificationLoader);
        getPrompts(setNetworking, "networking", setNetworkingLoader);
        getPrompts(
          setCombinedSkills,
          "combinedSkills",
          setCombinedSkillsLoader,
        );
      } catch (error) {
        throw error;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profession, province]);

  return (
    <div className="grid grid-cols-1 justify-evenly gap-8 md:grid-cols-2 lg:grid-cols-3">
      <Card key="overview" type="overview" isLoading={overviewLoader}>
        <Paragraph>{overview.content}</Paragraph>
      </Card>
      <Card
        key="info"
        type="info"
        isLoading={infoLoader}
        minimizedContent={<InfoMinimized {...info} />}
      >
        <div className="grid grid-cols-2 gap-6">
          <div className="min-h-[150px] rounded-xl bg-light-gray p-6">
            <Paragraph className="mb-2" weight="bold">
              Salary
            </Paragraph>
            {info.salary.map((content: string, index: number) => (
              <Paragraph key={content}>
                {index === 1 && "*"} {content}
              </Paragraph>
            ))}
          </div>

          <div className="min-h-[150px] rounded-xl bg-light-gray p-6">
            <Paragraph className="mb-2" weight="bold">
              Degree
            </Paragraph>
            <Paragraph>{info.Degree}</Paragraph>
          </div>

          <div className="min-h-[150px] rounded-xl bg-light-gray p-6">
            <Paragraph className="mb-2" weight="bold">
              Work
            </Paragraph>
            {info.Work.map((content: string, index: number) => (
              <Paragraph key={content}>
                {content} {index < info.Work.length && "|"}
              </Paragraph>
            ))}
          </div>

          <div className="min-h-[150px] rounded-xl bg-light-gray p-6">
            <Paragraph className="mb-2" weight="bold">
              Credential Validation
            </Paragraph>
            <Paragraph>{info["Credential Validation"]}</Paragraph>
          </div>

          <div className="min-h-[150px] rounded-xl bg-light-gray p-6">
            <Paragraph className="mb-2" weight="bold">
              Language Proficiency
            </Paragraph>
            <Paragraph>{info["Language Proficiency"]}</Paragraph>
          </div>
        </div>
      </Card>
      <Card
        key="combinedSkills"
        type="combinedSkills"
        isLoading={combinedSkillsLoader}
      >
        <div className="grid grid-cols-2 gap-6">
          {combinedSkills.map((field: { title: string; content: string[] }) => (
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
      <Card key="education" type="education" isLoading={educationLoader}>
        <div className="grid grid-cols-2 gap-6">
          {education.content?.map((field: { title: string; desc: string }) => (
            <div
              className="min-h-[150px] rounded-xl bg-light-gray p-6"
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
      <Card
        key="qualification"
        type="qualification"
        isLoading={qualificationLoader}
      >
        <Paragraph weight="bold" size="large">
          {qualification.regulated
            ? "Regulated profession"
            : "Non-regulated profession"}
        </Paragraph>
        <Paragraph className="mb-2">
          {capitalizeWords(profession)} - {qualification.title}:
        </Paragraph>
        <div className="grid grid-cols-2 gap-6">
          {qualification.content?.map(
            (field: { title: string; desc: string }) => (
              <div
                className="min-h-[150px] rounded-xl bg-light-gray p-6"
                key={field.title}
              >
                <Paragraph className="mb-2" weight="bold">
                  {field.title}
                </Paragraph>
                <Paragraph className="mb-2">{field.desc}</Paragraph>
              </div>
            ),
          )}
        </div>
      </Card>
      <Card key="networking" type="networking" isLoading={networkingLoader}>
        <div className="grid grid-cols-2 gap-6">
          {networking.content?.map(
            (field: { name: string; services: string[]; website: string }) => (
              <div
                className="min-h-[200px] rounded-xl bg-light-gray p-6"
                key={field.name}
              >
                <Paragraph className="mb-2" weight="bold">
                  {field.name}
                </Paragraph>
                {field.services.map((content: string) => (
                  <Paragraph key={content}>{content}</Paragraph>
                ))}
                <Paragraph>
                  <a href={field.website}>{field.website}</a>
                </Paragraph>
              </div>
            ),
          )}
        </div>
      </Card>
    </div>
  );
};

export default RoadmapCards;
