import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import advancedFormat from "dayjs/plugin/advancedFormat";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(utc);
dayjs.extend(advancedFormat);
dayjs.extend(relativeTime);

export function formatBookDate(isoUtc) {
  return dayjs.utc(isoUtc).local().format("MMM Do YYYY h:mma");
}

export function formatShortDate(isoUtc) {
  return dayjs.utc(isoUtc).local().format("MMM D, YYYY");
}

export function formatRelativeDate(isoUtc) {
  return dayjs.utc(isoUtc).local().fromNow();
}
