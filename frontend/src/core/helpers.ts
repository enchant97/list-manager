export function combineUrl(path_part: string, base_url: string): string {
  return base_url.replace(/\/$/, "") + "/" +  path_part.replace(/^\//, "");
}
