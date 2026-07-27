import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import advancedFormat from "dayjs/plugin/advancedFormat";

dayjs.extend(utc);
dayjs.extend(advancedFormat);

export function formatBookDate(isoUtc) {
  return dayjs.utc(isoUtc).local().format("MMM Do YYYY h:mma");
}

export function formatShortDate(isoUtc) {
  return dayjs.utc(isoUtc).local().format("MMM D, YYYY");
}
