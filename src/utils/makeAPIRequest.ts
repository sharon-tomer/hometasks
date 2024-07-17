export async function makeAPIRequest(
  url: string,
  options: RequestInit
): Promise<any> {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error. status: ${response.status}`);
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    } else {
      throw new Error("Invalid content type: Expected JSON");
    }
  } catch (error) {
    throw new Error(`Fetch error: ${error}`);
  }
}
