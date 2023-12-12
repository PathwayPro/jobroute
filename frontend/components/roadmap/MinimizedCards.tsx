import Paragraph from "@/ui/Paragraph";
import {
  EducationProps,
  InfoProps,
  NetworkingProps,
  QualificationProps,
  SkillProps,
  Skills,
} from "./types";

export const OverviewMinimized = ({ content }: { content: string }) => {
  return (
    <div className="line-clamp-6">
      <Paragraph>{content}...</Paragraph>
    </div>
  );
};

export const InfoMinimized = ({
  salary,
  "Credential Validation": credentialValidation,
  Degree: degree,
  Work: work,
}: InfoProps) => {
  return (
    <div className="grid h-[180px] grid-cols-2 gap-2">
      <div className="line-clamp-1 flex h-[60px] flex-col rounded-xl bg-light-gray p-2">
        <p className="text-sm font-bold">Salary</p>
        <p className="line-clamp-1 text-xs">{salary[0]}</p>
      </div>
      <div className="line-clamp-1 flex h-[60px] flex-col rounded-xl bg-light-gray p-2">
        <p className="text-sm font-bold">Degree</p>
        <p className="line-clamp-1 text-xs">{degree}</p>
      </div>
      <div className="line-clamp-1 flex h-[60px] flex-col rounded-xl bg-light-gray p-2">
        <p className="text-sm font-bold">Work</p>
        <p className="line-clamp-1 text-xs">{work[0]}</p>
      </div>
      <div className="line-clamp-1 flex h-[60px] flex-col rounded-xl bg-light-gray p-2">
        <p className="text-sm font-bold">Credential</p>
        <p className="line-clamp-1 text-xs">{credentialValidation}</p>
      </div>
    </div>
  );
};

export const SkillsMinimized = ({ skills }: { skills: SkillProps }) => {
  return (
    <div className="grid grid-cols-2 gap-6">
      {skills.map((category: Skills) => (
        <div key={category.title}>
          <Paragraph className="mb-2" weight="bold">
            {category.title}
          </Paragraph>
          {category.content.slice(0, 5).map((content: string) => (
            <Paragraph className="mb-1 line-clamp-1" key={content}>
              • {content}
            </Paragraph>
          ))}
        </div>
      ))}
    </div>
  );
};

export const QualificationMinimized = ({ content }: QualificationProps) => {
  return (
    <>
      <div className="grid h-[180px] grid-cols-2 gap-2">
        {content?.map(
          (field: { title: string; desc: string }, index) =>
            index <= 3 && (
              <div
                key={field.title}
                className="line-clamp-1 flex h-[70px] flex-col rounded-xl bg-light-gray p-2"
              >
                <p className="text-sm font-bold">{field.title}</p>
                <p className="line-clamp-1 text-xs">{field.desc}</p>
              </div>
            ),
        )}
      </div>
    </>
  );
};

export const EducationMinimized = ({ content }: EducationProps) => {
  return (
    <>
      <div className="grid h-[180px] grid-cols-2 gap-2">
        {content?.map(
          (field: { title: string; desc: string }, index) =>
            index <= 3 && (
              <div
                key={field.title}
                className="line-clamp-1 flex h-[70px] flex-col rounded-xl bg-light-gray p-2"
              >
                <p className="text-sm font-bold">{field.title}</p>
                <p className="line-clamp-1 text-xs">{field.desc}</p>
              </div>
            ),
        )}
      </div>
    </>
  );
};

export const NetworkingMinimized = ({ content }: NetworkingProps) => {
  return (
    <>
      <div className="grid h-[180px] grid-cols-2 gap-2">
        {content?.map(
          (field: { name: string; services: string[] }, index) =>
            index <= 3 && (
              <div
                key={field.name}
                className="line-clamp-1 flex h-[70px] flex-col rounded-xl bg-light-gray p-2"
              >
                <p className="line-clamp-2 text-sm font-bold">{field.name}</p>
                <p className="line-clamp-1 text-xs">{field.services[0]}...</p>
              </div>
            ),
        )}
      </div>
    </>
  );
};
