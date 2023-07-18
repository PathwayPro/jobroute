import Image from "next/image";

const EDUCATION = 'Education / Training';
const EXPERIENCE = 'Experience / Projects';
const LICENSING = 'Licensing / Certification';
const NETWORKING = 'Job Search / Networking';

const RoadmapCards = () => {
  const roadmap = [
    {
      title: 'Education / Training',
      content: [
        { title: 'Step 1', desc: 'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat. Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.' },
        { title: 'Step 2', desc: 'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat. Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.' },
        { title: 'Step 3', desc: 'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat. Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.' },
      ],
    },
    {
      title: 'Experience / Projects',
      content: [
        { title: 'Step 1', desc: 'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat. Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.' },
        { title: 'Step 2', desc: 'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat. Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.' },
        { title: 'Step 3', desc: 'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat. Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.' },
      ],
    },
    {
      title: 'Job Search / Networking',
      content: [
        { title: 'Step 1', desc: 'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat. Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.' },
        { title: 'Step 2', desc: 'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat. Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.' },
        { title: 'Step 3', desc: 'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat. Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.' },
      ],
    },
  ];

  const cards = (list: any) => {
    return <div className='flex flex-col'>
      {list.map((card: any, i: any) => {
        const defIcon = (title: any) => {
          const actions = [
            {
              condition: () => title === EDUCATION,
              action: () => '/img/education.svg',
            },
            {
              condition: () => title === EXPERIENCE,
              action: () => '/img/experience.svg',
            },
            {
              condition: () => title === LICENSING,
              action: () => '/img/licensing.svg',
            },
            {
              condition: () => title === NETWORKING,
              action: () => '/img/networking.svg',
            },
          ];

          const action = actions.find(({ condition }) => condition());

          if (action) return action.action();
        }
        return <div className='relative bg-[#EFEFEF] pt-3 pl-8 mt-4 ml-12 border-2' key={i}>
          <span className='card-title'>{card.title}</span>
          <Image className='absolute left-[-45px] top-[50%] transform -translate-y-1/2' src={defIcon(card.title)} width={90} height={90} alt='card icons' />
          <ol className='list-decimal list-outside card-body'>
            {card.content.map((field: any, i: any) => {
              return <li key={i}>
                <span>{field.title}: </span>
                <span>{field.desc}</span>
              </li>
            })}
          </ol>
        </div>
      })}
    </div>
  }

  return <div className='flex items-stretch justify-between my-3 ml-12'>
    <div className='w-[60px] bg-gradient-to-b from-yellow-400 via-orange-600 to-blue-600'></div>
    {cards(roadmap)}

  </div>

}

export default RoadmapCards;
