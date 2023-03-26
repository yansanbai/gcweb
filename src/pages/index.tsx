import { definePageConfig } from "ice";

export default function Dashboard() {
  return null;
}

export const pageConfig = definePageConfig(() => {
  return {
    auth: ["admin", "user"],
  };
});
