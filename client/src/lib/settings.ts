export const ITEM_PER_PAGE = 18;

type RouteAccessMap = {
  [key: string]: string[];
};

export const routeAccessMap: RouteAccessMap = {
  "/admin(.*)": ["admin"],
  "/user(.*)": ["user"],
  "/guest(.*)": ["guest"],
  "/list/events": ["admin", "user", "guest"],
  "/list/kits": ["admin", "user"],
  "/list/equipments": ["admin", "user"],
  "/list/recipients": ["admin", "user"],
  "/list/users": ["admin", "user"],
};
