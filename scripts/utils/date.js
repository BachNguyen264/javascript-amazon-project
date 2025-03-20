import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

export function formatDate(date) {
  const time = dayjs(date);
  return time.format("MMMM D");
}
