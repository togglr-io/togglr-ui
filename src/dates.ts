import dayjs, { Dayjs } from "dayjs";
import relativeTimePlugin from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTimePlugin);

export function relativeTime(date: Dayjs): string {
  return date.fromNow();
}
