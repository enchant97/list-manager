from tortoise.fields import (CharField, DatetimeField, ForeignKeyField,
                             ForeignKeyRelation, IntField, ReverseRelation)
from tortoise.models import Model


class MetaMixin:
    created_at = DatetimeField(auto_now_add=True)
    updated_at = DatetimeField(auto_now=True)


class ItemList(Model, MetaMixin):
    id = IntField(pk=True)
    title = CharField(80)
    description = CharField(255, null=True)

    items: ReverseRelation["ListItem"]


class ListItem(Model, MetaMixin):
    id = IntField(pk=True)
    title = CharField(80)
    related_list: ForeignKeyRelation[ItemList] = ForeignKeyField(
        "models.ItemList", "items")
