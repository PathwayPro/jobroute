import Paragraph from '@/ui/Paragraph';
import { Iconly } from 'react-iconly';

const Overview = () => {
  const containerClasses = 'bg-white overflow-y-auto scrollbar h-auto max-h-[800px] rounded-lg p-4 shadow-none border-none text-md text-[#42444D]';

  return (
    <>
        <div className="inline-flex items-center bg-black p-2 rounded-full shadow-md">
          <div className="bg-white rounded-full p-1">
            <Iconly name="Chat" set="bold" primaryColor="black" size={20} />
          </div>
          <span className="ml-2 text-sm pr-2 font-bold uppercase text-white">Overview</span>
        </div>
      <div className={containerClasses}>
        <Paragraph>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nisi delectus commodi, quos veniam rem nostrum labore minima vero aspernatur obcaecati sit voluptate, voluptatum inventore ipsam ex consequuntur repudiandae nesciunt debitis sapiente fuga. Doloribus eligendi exercitationem magni amet earum aspernatur quasi in porro expedita voluptatum error rerum at commodi ipsa fugiat, atque sed corporis quae. Optio quis saepe facere temporibus eaque ullam eum, totam quas facilis quod dolorum voluptatibus exercitationem voluptas? Necessitatibus harum, voluptate officia tempore voluptatem distinctio, inventore explicabo doloribus ipsum totam pariatur veniam optio nobis eius sapiente quod iusto temporibus nesciunt! Saepe in quas excepturi assumenda molestias repellat quo dolorem iste consectetur, reprehenderit nam facilis mollitia voluptate aut iure rem temporibus voluptatum, odio earum eveniet! Possimus praesentium distinctio autem nemo eos explicabo aspernatur blanditiis fuga error animi beatae consectetur ipsa non recusandae odit dignissimos earum minus eius soluta corrupti, inventore porro. Accusamus ad illo id ipsam alias deleniti sit nostrum praesentium sunt assumenda cupiditate porro reiciendis illum a et, quam tenetur dolor ea omnis eligendi veritatis magnam odio voluptate! Provident quidem adipisci nihil ullam consequuntur minima laudantium, expedita sit nam deleniti voluptas pariatur asperiores! Doloremque, optio. Possimus odit explicabo recusandae molestiae nemo at minima ex velit eum soluta adipisci eius neque ea blanditiis enim, impedit deserunt atque rem praesentium. Nihil consequuntur doloribus vitae iusto obcaecati aspernatur, architecto eius perspiciatis delectus numquam sit nesciunt laborum, perferendis eum unde. Dolor, veritatis recusandae cumque natus error, esse perferendis deserunt incidunt nisi, repellendus officia quam velit? Commodi sequi inventore quasi corrupti officiis iure magnam neque beatae id! Quas incidunt voluptatum blanditiis neque laboriosam molestias illo, sapiente deserunt aspernatur recusandae! Obcaecati sunt commodi facilis? Harum dolorum aut nesciunt cupiditate deleniti reiciendis mollitia repudiandae cum blanditiis accusantium, dolorem dicta placeat nisi aperiam veritatis, consequuntur nobis laboriosam quasi libero laudantium officia? Quos deleniti iusto perferendis doloremque!
        </Paragraph>
      </div>
    </>
  );
};

export default Overview;
