import { RoadmapProps, TitleContent } from "@/types/PropsTypes";
import { Header3, HrDashed } from "../Elements";

const Skills = ({skills}: Pick<RoadmapProps, 'skills'>) => {
  return <div className='mt-12'>
    <div className='mt-12 grid grid-cols-2 place-items-center'>
      {skills.map((skill: TitleContent, i: number) => {
        return <div key={i}>
          <Header3 className='text-primary-text'>{skill.title}</Header3>
          <ol className='list-decimal'>
            {skill.content.map((skill, i) => {
              return <li key={i}>{skill}</li>
            })}
          </ol>
        </div>
      })}
    </div>
  </div>
}

export default Skills;
