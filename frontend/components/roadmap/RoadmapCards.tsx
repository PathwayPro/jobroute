import Paragraph from "@/ui/Paragraph";
import Card from "./Card";
import { useCallback, useEffect, useState } from "react";
import { fetchRoadmap } from "@/fetch/fetchRoadmap";
import { capitalizeWords } from "@/utils/utils";
import {
  EducationProps,
  NetworkingProps,
  QualificationProps,
  SkillProps,
  InfoProps,
  Skills,
} from "./types";
import { provincesLowercase } from "@/provinces";
import {
  EducationMinimized,
  InfoMinimized,
  NetworkingMinimized,
  OverviewMinimized,
  QualificationMinimized,
  SkillsMinimized,
} from "./MinimizedCards";

interface RequestData {
  setter: (data: any) => void;
  endpoint: string;
  loader: (loading: boolean) => void;
}

interface RoadmapCardProps {
  profession: string;
  province: string;
}

interface EndpointError {
  endpoint: string;
  errorName: string;
}

const RoadmapCards = ({ profession, province }: RoadmapCardProps) => {
  const slowMode: boolean = process.env.NEXT_PUBLIC_SLOW_MODE === "true";

  const allowedProvince = provincesLowercase.includes(province?.toLowerCase());
  if (!profession || !province || !allowedProvince) return null;

  const initCard = { title: "", content: [] };
  const initInfo = {
    salary: [],
    "Credential Validation": "",
    Degree: "",
    Work: [],
    "Language Proficiency": "",
  };
  const initQualification = { regulated: undefined, title: "", content: [] };
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

  const [combinedSkills, setCombinedSkills] = useState<SkillProps>([]);
  const [combinedSkillsLoader, setCombinedSkillsLoader] = useState(true);

  const [error, setError] = useState<EndpointError[]>([]);

  const getPrompts = async (
    endpoint: string,
    loader: any,
    signal: AbortSignal,
  ): Promise<any> => {
    try {
      const response = await fetchRoadmap(
        endpoint,
        profession,
        province,
        signal,
      );
      loader(false);
      return response;
    } catch (error: any) {
      console.warn(`Failed attempt to call the ${endpoint} prompt`, error);
      throw error.name;
    }
  };

  const fetchDataWithDelay = useCallback(
    async (
      requests: RequestData[],
      abortController: AbortController,
    ): Promise<any[]> => {
      const results: any[] = [];
      const delayInMs = 500;

      for (const { setter, endpoint, loader } of requests) {
        const signal = abortController.signal;
        try {
          const response = await getPrompts(endpoint, loader, signal);
          setter(response);
          results.push(response);
        } catch (error: any) {
          console.error(`Error fetching data for ${endpoint}:`, error);
          setError((prevError) => [
            ...prevError,
            { endpoint, errorName: error },
          ]);
        }

        if (slowMode) {
          await new Promise((resolve) => setTimeout(resolve, delayInMs));
        }
      }

      return results;
    },
    [getPrompts, slowMode],
  );
  useEffect(() => {
    const abortController = new AbortController();

    const cleanup = () => {
      abortController.abort();
    };

    if (profession && province) {
      const requests: RequestData[] = [
        {
          setter: setOverview,
          endpoint: "overview",
          loader: setOverviewLoader,
        },
        { setter: setInfo, endpoint: "info", loader: setInfoLoader },
        {
          setter: setCombinedSkills,
          endpoint: "combinedSkills",
          loader: setCombinedSkillsLoader,
        },
        {
          setter: setEducation,
          endpoint: "education",
          loader: setEducationLoader,
        },
        {
          setter: setQualification,
          endpoint: "qualification",
          loader: setQualificationLoader,
        },
        {
          setter: setNetworking,
          endpoint: "networking",
          loader: setNetworkingLoader,
        },
      ];

      const fetchData = async () => {
        await fetchDataWithDelay(requests, abortController);
      };

      fetchData();

      return cleanup;
    }
  }, [profession, province]);

  function endpointHasError(endpoint: string) {
    return error.some(
      (error) =>
        error.endpoint === endpoint && error.errorName !== "AbortError",
    );
  }

  const retry = async (endpoint: string) => {
    const abortController = new AbortController();

    const requests: RequestData[] = [
      { setter: setOverview, endpoint: "overview", loader: setOverviewLoader },
      { setter: setInfo, endpoint: "info", loader: setInfoLoader },
      {
        setter: setCombinedSkills,
        endpoint: "combinedSkills",
        loader: setCombinedSkillsLoader,
      },
      {
        setter: setEducation,
        endpoint: "education",
        loader: setEducationLoader,
      },
      {
        setter: setQualification,
        endpoint: "qualification",
        loader: setQualificationLoader,
      },
      {
        setter: setNetworking,
        endpoint: "networking",
        loader: setNetworkingLoader,
      },
    ];

    const requestsToRetry = requests.filter(
      (request) => request.endpoint === endpoint,
    );

    await fetchDataWithDelay(requestsToRetry, abortController);
  };

  return (
    <div className="grid grid-cols-1 justify-evenly gap-8 md:grid-cols-2 lg:grid-cols-3">
      <Card
        key="overview"
        type="overview"
        isLoading={overviewLoader}
        minimizedContent={<OverviewMinimized {...overview} />}
        callback={() => retry("overview")}
        hasError={error.length > 0 && endpointHasError("overview")}
      >
        <Paragraph>{overview.content}</Paragraph>
      </Card>
      <Card
        key="info"
        type="info"
        isLoading={infoLoader}
        minimizedContent={<InfoMinimized {...info} />}
        hasError={error.length > 0 && endpointHasError("info")}
        callback={() => retry("info")}
      >
        <div className="grid grid-cols-2 gap-6 self-center">
          <div className="min-h-[100px] rounded-xl bg-light-gray p-6">
            <Paragraph className="mb-2" weight="bold">
              Salary
            </Paragraph>
            {info.salary.map((content: string, index: number) => (
              <Paragraph key={content}>
                {index === info.salary.length - 1 && "*"} {content}
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
            {info.Work.map((content: string) => (
              <Paragraph key={content} className="mb-1">
                {content}
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
        minimizedContent={<SkillsMinimized skills={combinedSkills} />}
        hasError={error.length > 0 && endpointHasError("combinedSkills")}
        callback={() => retry("combinedSkills")}
      >
        <div className="grid grid-cols-2 gap-6">
          {combinedSkills.map((category) => (
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
      <Card
        key="education"
        type="education"
        isLoading={educationLoader}
        minimizedContent={<EducationMinimized {...education} />}
        hasError={error.length > 0 && endpointHasError("education")}
        callback={() => retry("education")}
      >
        <div className="grid grid-cols-2 gap-6">
          {education.content?.map((field: { title: string; desc: string }) => (
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
      <Card
        key="qualification"
        type="qualification"
        isLoading={qualificationLoader}
        minimizedContent={<QualificationMinimized {...qualification} />}
        hasError={error.length > 0 && endpointHasError("qualification")}
        callback={() => retry("qualification")}
      >
        <Paragraph weight="bold" size="large">
          {qualification.regulated === true ? "Regulated profession" : null}
          {qualification.regulated === false
            ? "Non-regulated profession"
            : null}
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
      <Card
        key="networking"
        type="networking"
        isLoading={networkingLoader}
        minimizedContent={<NetworkingMinimized {...networking} />}
      >
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
    </div>
  );
};

export default RoadmapCards;
