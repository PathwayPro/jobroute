# consumers.py
import asyncio
import json
from channels.generic.websocket import AsyncWebsocketConsumer
from .websocketFunctions import generate_NOC_result, generate_summary, generate_Education

class ResultConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()
        print("[SERVER] Connection established....")
        print("[SERVER] Loading Results....")
        await self.generate_and_send_results()

    async def disconnect(self, code):
        pass

    async def send_result(self, event):
        await self.send(json.dumps(event['data']))

    async def send_one_by_one(self, function):
        result = await function
        await self.send_result({'data': result})

    async def generate_and_send_results(self):
        task1 = asyncio.create_task(self.send_one_by_one(generate_NOC_result()))
        task2 = asyncio.create_task(self.send_one_by_one(generate_summary()))

        await asyncio.gather(task1, task2)


        # self.send_one_by_one(task1)
        # self.send_one_by_one(task2)
        # await self.send_one_by_one(generate_Education())


    # async def generate_and_send_results(self):
    # # Start generate_NOC_result in the background
    #     result1_task = asyncio.create_task(generate_NOC_result())
    #     result2_task = asyncio.create_task(generate_summary())
    #     # Wait for generate_NOC_result to finish and send its result
    #     result1 = await result1_task
    #     await self.send_result({'data': result1})

    #     result2 = await result2_task
    #     await self.send_result({'data': result2})
    #     # Generate summary and send it to the client immediately
    #     result2 = await generate_summary()
    #     await self.send_result({'data': result2})


    # async def generate_and_send_results(self):
    #     await self.send_one_by_one(generate_NOC_result())
    #     await self.send_one_by_one(generate_summary())

    # async def generate_and_send_results(self):
    #     result1_task = generate_NOC_result()
    #     print("noc result type:",type(result1_task))
    #     result1 =  await result1_task
    #     await self.send_result({'data': result1}) 



    #     result2_task = generate_summary()
    #     # result3_task = generate_Education()
    #     # Start and await each task in the desired order
    #     result2 = await result2_task
    #     await self.send_result({'data': result2})

        


        # try:
        #     await self.send_result({'data': result1_task})
        #     await self.send_result({'data': result2_task})
        # except Exception as e:

        #     print(e)
        


      

        # result3 = await result3_task
        # await self.send_result({'data': result3})


    # async def generate_and_send_results(self):

    #     result1 = await generate_NOC_result()
    #     await self.send_result({'data': result1})
    #     sleep(2)
        
    #     result2 = await generate_summary()
    #     await self.send_result({'data': result2})

    # async def generate_and_send_results(self):
    #     result1_task = generate_NOC_result()

    #     # Send result1 to the client as soon as it's generated
    #     result1 = await result1_task
    #     await self.send_result({'data': result1})

    #     # Now start generating result2, but don't wait for it
    #     result2_task = generate_summary()

    #     # When result2 is ready, send it to the client
    #     result2 = await result2_task
    #     await self.send_result({'data': result2})
        
    #     result3_task = generate_Education()

    #     # When result2 is ready, send it to the client
    #     result3 = await result3_task
    #     await self.send_result({'data': result3})





    # async def generate_and_send_results(self):
    #     result1_task = self.generate_and_send_result1()
    #     result2_task = self.generate_and_send_result2()

    #     await asyncio.gather(result1_task, result2_task)

    # async def generate_and_send_result1(self):
    #     result1 = await generate_NOC_result()
    #     await self.send_result({'data': result1})

    # async def generate_and_send_result2(self):
    #     result2 = await generate_summary()
    #     await self.send_result({'data': result2})

# async def generate_and_send_results(consumer):
#     result1 = await generate_NOC_result()
#     await consumer.send_result({'data': result1})

#     result2 = await generate_role_summary_result()
#     await consumer.send_result({'data': result2})

# async def generate_NOC_result():
#     # Generate result1 asynchronously
#     result1 = {'NOC': get_NOC()}
#     return result1

# async def generate_role_summary_result():
#     # Generate result2 asynchronously
#     result2 = {'Overview': 'Brief summary'}
#     return result2
