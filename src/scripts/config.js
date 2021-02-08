const serverUrl =
  NODE_ENV === "development" ? "http://nomoreparties.co" : "https://nomoreparties.co";
export const config = {
  baseUrl: `${serverUrl}/cohort11`,
  pathCards: "cards",
  pathUsersMe: "users/me",
  pathLike: "like",
  pathAvatar: "avatar",
  headers: {
    authorization: "7442c6b0-8af2-4a77-b623-1106470b7c0d",
    "Content-Type": "application/json",
  },
  myId: "",
};
