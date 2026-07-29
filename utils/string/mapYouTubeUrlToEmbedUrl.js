function Index(url) {
  try {
      const parsedUrl = new URL(url);
      let videoId = "";

      if (parsedUrl.hostname === "youtu.be") {
        // Short link: https://youtu.be/VIDEO_ID
        videoId = parsedUrl.pathname.slice(1);
      } else if (parsedUrl.hostname.includes("youtube.com")) {
        if (parsedUrl.pathname === "/watch") {
          // Standard URL: https://www.youtube.com/watch?v=VIDEO_ID
          videoId = parsedUrl.searchParams.get("v");
        } else if (parsedUrl.pathname.startsWith("/embed/")) {
          // Already in embed format
          return url;
        } else if (parsedUrl.pathname.startsWith("/shorts/")) {
          // Shorts URL: https://www.youtube.com/shorts/VIDEO_ID
          videoId = parsedUrl.pathname.split("/")[2];
        }
      }

      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
    } catch (e) {
      // Invalid URL
      return url;
    }

    return url;
}

export default Index;


