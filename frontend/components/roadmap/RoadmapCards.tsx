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
import OverviewCard from "./OverviewCard";
import InfoCard from "./InfoCard";
import SkillsCard from "./SkillsCard";
import EducationCard from "./EducationCard";
import QualificationCard from "./QualificationCard";
import NetworkingCard from "./NetworkingCard";

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

const initCard = { title: "", content: [] };
const initInfo = {
  salary: [],
  "Credential Validation": "",
  Degree: "",
  Work: [],
  "Language Proficiency": "",
};
const initQualification = { regulated: undefined, title: "", content: [] };

const RoadmapCards = ({ profession, province }: RoadmapCardProps) => {
  const slowMode: boolean = process.env.NEXT_PUBLIC_SLOW_MODE === "true";

  const allowedProvince = provincesLowercase.includes(province?.toLowerCase());
  if (!profession || !province || !allowedProvince) return null;

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

  console.log("error", error);

  function getRequests() {
    return [
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
  }

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
          loader(false);
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
      const requests: RequestData[] = getRequests();

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

    const requests: RequestData[] = getRequests();

    const requestsToRetry = requests.filter(
      (request) => request.endpoint === endpoint,
    );

    await fetchDataWithDelay(requestsToRetry, abortController);
  };

  return (
    <div className="grid grid-cols-1 justify-evenly gap-8 md:grid-cols-2 lg:grid-cols-3">
      <OverviewCard
        callback={() => retry("overview")}
        data={overview}
        hasError={error.length > 0 && endpointHasError("overview")}
        isLoading={overviewLoader}
      />
      <InfoCard
        callback={() => retry("info")}
        data={info}
        hasError={error.length > 0 && endpointHasError("info")}
        isLoading={infoLoader}
      />
      <SkillsCard
        callback={() => retry("combinedSkills")}
        data={combinedSkills}
        hasError={error.length > 0 && endpointHasError("combinedSkills")}
        isLoading={combinedSkillsLoader}
      />
      <EducationCard
        callback={() => retry("education")}
        data={education}
        hasError={error.length > 0 && endpointHasError("education")}
        isLoading={educationLoader}
      />
      <QualificationCard
        callback={() => retry("qualification")}
        data={qualification}
        hasError={error.length > 0 && endpointHasError("qualification")}
        isLoading={qualificationLoader}
      />
      <NetworkingCard
        callback={() => retry("networking")}
        data={networking}
        hasError={error.length > 0 && endpointHasError("networking")}
        isLoading={networkingLoader}
      />
    </div>
  );
};

export default RoadmapCards;
