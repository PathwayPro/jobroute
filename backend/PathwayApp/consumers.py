# consumers.py
# import json
# from channels.generic.websocket import AsyncWebsocketConsumer

# class ResultConsumer(AsyncWebsocketConsumer):
#     async def connect(self):
#         await self.accept()

#     async def disconnect(self, close_code):
#         pass

#     async def send_result(self, event):
#         result_data = event['data']
#         await self.send(json.dumps(result_data))

import json
from channels.generic.websocket import AsyncWebsocketConsumer

class ResultConsumer(AsyncWebsocketConsumer):
    async def connect(self):
         await self.accept()

    async def disconnect(self, code):
        #  return await super().disconnect(code)
        pass

    async def send_result(self, event):
        result_data = event['data']
        await self.send(json.dumps(result_data))