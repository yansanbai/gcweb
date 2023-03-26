import { history } from "ice";

export const itemRender = (route) => {
  const { path, breadcrumbName } = route;
  return (
    <span
      onClick={() => {
        if (path) {
          history?.push(path);
        }
      }}
    >
      {breadcrumbName}
    </span>
  );
};
