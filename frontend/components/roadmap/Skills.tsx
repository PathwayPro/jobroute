import { RoadmapProps, TitleContent } from "@/types/PropsTypes";
import { Header2, HrDashed } from "../Elements";

const Skills = ({skills}: Pick<RoadmapProps, 'skills'>) => {
  return <div className='mt-12'>
    <HrDashed />
    <div className='mt-12 grid grid-cols-2 place-items-center'>
      {skills.map((skill: TitleContent, i: number) => {
        return <div key={i}>
          <Header2>{skill.title}</Header2>
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
