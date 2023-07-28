import { Header2, HrDashed } from "../Elements";

const Skills = () => {
  const response = [
    {
      title: 'Core Hard Skills',
      content: [
        'Medical Knowledge',
        'Clinical Skills',
        'Patient Assessment',
        'Medication Administration',
        'Patient Education',
        'Electronic Health Records (EHR)',
        'Diagnostic Tests and Procedures',
        'Emergency Response',
        'Infection Control',
        'Technical Skills',
      ],
    },
    {
      title: 'Soft Skills',
      content: [
        'Communication',
        'Compassion',
        'Critical Thinking',
        'Problem Solving',
        'Collaboration',
        'Time Management',
        'Flexibility',
        'Stress Management',
        'Cultural Sensitivity',
        'Leadership',
      ],
    }
  ];
  return <div className='mt-12'>
    <HrDashed />
    <div className='mt-12 grid grid-cols-2 place-items-center'>
      {response.map((list, i) => {
        return <div key={i}>
          <Header2>{list.title}</Header2>
          <ol className='list-decimal'>
            {list.content.map((skill, i) => {
              return <li key={i}>{skill}</li>
            })}
          </ol>
        </div>
      })}
    </div>
  </div>
}

export default Skills;
