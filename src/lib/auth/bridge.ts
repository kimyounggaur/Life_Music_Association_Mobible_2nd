export const nativeAuthCallbackScheme = "com.lmlak://auth-callback";

export function buildNativeAuthCallback(search: string) {
  const query = search.startsWith("?") ? search : search ? `?${search}` : "";
  return `${nativeAuthCallbackScheme}${query}`;
}
