import Realm from "realm";
import { Order } from "../../models/Order";

export const getRealm = async () => {
  return await Realm.open({ schema: [Order] });
};
