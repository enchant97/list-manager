from asyncio.queues import Queue
from collections import defaultdict
from collections.abc import Iterable
from dataclasses import asdict, dataclass
from enum import IntEnum
from typing import Optional, Union
from uuid import uuid4


class MessageHandler:
    """
    Handles pushing messages to multiple
    clients listening on specific rooms
    """

    def __init__(self):
        self.__clients_by_id: dict[str, Queue] = {}
        self.__clients_by_room: dict[str, set[str]] = defaultdict(set)

    def _gather_clients_in_rooms(self, rooms: Iterable[str]) -> set[str]:
        clients: set[str] = set()

        for room_name in rooms:
            clients.update(self.__clients_by_room[room_name])

        return clients

    def cleanup_rooms(self):
        """
        Removes any unused rooms
        """

        to_remove = [key for key in self.__clients_by_room if len(
            self.__clients_by_room[key]) == 0]
        for key in to_remove:
            del self.__clients_by_room[key]

    async def new_message_by_client(self, *, message, client_ids: Union[str, Iterable[str]]):
        """
        Push a new message to a specific client(s)

            :param message: The message to send
            :param client_ids: The client id
        """
        if isinstance(client_ids, str):
            client_ids = (client_ids,)

        for client_id in client_ids:
            await self.__clients_by_id[client_id].put(message)

    async def new_message_by_room(self, *, message, rooms: Union[str, Iterable[str]]):
        """
        Push a new message to all clients of a room(s)

            :param message: The message to send
            :param rooms: The room(s)
        """
        if isinstance(rooms, str):
            rooms = (rooms,)

        clients = self._gather_clients_in_rooms(rooms)

        await self.new_message_by_client(message=message, client_ids=clients)

    async def new_message_global(self, *, message):
        """
        Push new message to all clients

            :param message: The message to send
        """
        await new_message_by_client(message=message, client_ids=self.__clients_by_id)

    def remove_client(self, client_id: str, *, run_cleanup: bool = True):
        """
        Remove a client from message handler

            :param client_id: The clients id
            :param run_cleanup: Whether to cleanup any unused rooms, defaults to True
        """
        for room_name in self.__clients_by_room:
            self.__clients_by_room[room_name].discard(client_id)
        try:
            del self.__clients_by_id[client_id]
        except KeyError:
            pass

        if run_cleanup:
            self.cleanup_rooms()

    def add_client(self, *, queue: Queue, rooms: Union[str, Iterable[str]]) -> str:
        """
        Add a new client to the message handler

            :param queue: The clients personal message queue
            :param rooms: Room(s) to listen on
            :return: The clients given id
        """
        client_id = uuid4().hex
        self.__clients_by_id[client_id] = queue

        if isinstance(rooms, str):
            rooms = (rooms,)

        for room_name in rooms:
            self.__clients_by_room[room_name].add(client_id)

        return client_id

    def create_client(self, *, rooms: Union[str, Iterable[str]]) -> tuple[str, Queue]:
        """
        Create a new client and add to the message handler

            :param rooms: Room(s) to listen on
            :return: The clients given id, and a personal message queue
        """
        message_queue = Queue()
        client_id = add_client(queue=message_queue, rooms=rooms)
        return client_id, message_queue


class LiveUpdateMessageHandler(MessageHandler):
    @staticmethod
    def make_room_names(list_id: Optional[int]) -> Union[str, tuple[str]]:
        if list_id is not None:
            return "lists", f"lists-{list_id}"
        return "lists"

    async def new_message_by_room(self, *, message, list_id: Optional[int]):
        rooms = self.make_room_names(list_id)
        await super().new_message_by_room(message=message, rooms=rooms)

    def add_client(self, *, queue: Queue, list_id: Optional[int]) -> str:
        rooms = self.make_room_names(list_id)
        return super().add_client(queue=queue, rooms=rooms)

    def create_client(self, *, list_id: Optional[int]) -> tuple[str, Queue]:
        message_queue = Queue()
        client_id = self.add_client(queue=message_queue, list_id=list_id)
        return client_id, message_queue


class LiveUpdateMessageType(IntEnum):
    OTHER = 0
    CREATE = 1
    UPDATE = 2
    REMOVE = 3


@dataclass
class UpdateMessage:
    update_type: LiveUpdateMessageType
    list_id: int
    item_id: Optional[int] = None

    def asdict(self) -> dict:
        return asdict(self)
