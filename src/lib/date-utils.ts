/** Extract year from various date formats: yyyy-mm-dd, yyyy-mm, dd/mm/yyyy, mm/yyyy */
export function extractYear(dateStr: string): number {
  if (!dateStr) return NaN;
  // yyyy-mm-dd or yyyy-mm
  if (/^\d{4}/.test(dateStr)) return parseInt(dateStr.substring(0, 4));
  const parts = dateStr.split("/");
  // dd/mm/yyyy
  if (parts.length === 3) return parseInt(parts[2]);
  // mm/yyyy
  if (parts.length === 2) return parseInt(parts[1]);
  return NaN;
}
