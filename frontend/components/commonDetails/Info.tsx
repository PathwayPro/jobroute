import Image from "next/image";

const SALARY = 'Salary';
const DEGREE = 'Degree';
const WORK = 'Work';
const VALIDATION = 'Credential Validation';
const LANGUAGE = 'Language Proficiency';

const Info = () => {
  const response = [
    {
      title: 'Salary',
      content: [
        '$00.00 - $0000.00',
        'will vary according to seniority',
      ]
    },
    {
      title: 'Degree',
      content: [
        'Recommended',
      ],
    },
    {
      title: 'Work',
      content: [
        'Remote | Hybrid | In Person',
        'Part-time | Full-time | Contract Freelance | Consulting',
      ],
    },
    {
      title: 'Credential Validation',
      content: [
        'Not required',
      ],
    },
    {
      title: 'Language Proficiency',
      content: [
        'English - Advanced oral and writting',
      ],
    },

  ];


  const defIcon = (title: any) => {

    const actions = [
      {
        condition: () => title === SALARY,
        action: () => '/img/salary.svg',
      },
      {
        condition: () => title === DEGREE,
        action: () => '/img/degree.svg',
      },
      {
        condition: () => title === WORK,
        action: () => '/img/work.svg',
      },
      {
        condition: () => title === VALIDATION,
        action: () => '/img/validation.svg',
      },
      {
        condition: () => title === LANGUAGE,
        action: () => '/img/language.svg',
      },
    ];

    const action = actions.find(({ condition }) => condition());

    if (action) return action.action();
  }


  return <div>
    <span>Info</span>
    <div>
      {response.map((card, i) => {
        return <div key={i}>
          <Image src={defIcon(card.title)} width={40} height={40} alt='Info icon' />
          <span>{card.title}</span>
          <div className="my-4 border border-gray-300 border-dashed"></div>
          {
            card.content.map((field, i) => {
              return <div key={i}>
                {field}
              </div>
            })
          }
        </div>
      })}
    </div>
  </div>
}

export default Info;
