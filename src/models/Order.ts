import { BSON, ObjectSchema } from "realm";

export class Order extends Realm.Object<Order> {
  _id!: BSON.ObjectId;
  id!: string;
  title!: string;
  description!: string;
  status!: "Pending" | "In Progress" | "Completed";
  assignedTo!: string;
  createdAt!: string;
  updatedAt!: string;
  deletedAt?: string;
  completed!: boolean;
  deleted!: boolean;
  synced!: boolean;

  static schema: ObjectSchema = {
    name: "Order",
    primaryKey: "_id",
    properties: {
      _id: "objectId",
      id: "string",
      title: "string",
      description: "string",
      status: "string",
      assignedTo: "string",
      createdAt: "string",
      updatedAt: "string",
      deletedAt: "string?",
      completed: "bool",
      deleted: "bool",
      synced: { type: "bool", default: false },
    },
  };
}
