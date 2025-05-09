import { format } from "date-fns";

export function formatDate(isoString: any) {
  return format(new Date(isoString), "MMMM d, yyyy h:mm:ss a");
}
