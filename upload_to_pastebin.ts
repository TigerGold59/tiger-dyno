export const uploadToPastebin = async function (
  text: string,
  callback: (id: string) => any
) {
  let paste = require("paste.ee") as (
    data: string,
    token: string
  ) => Promise<{ id: string }>;
  let posted = await paste(text, require("./paste_api_token.json")["token"]);
  // Calls callback function with ID, NOT link
  callback(posted.id);
};
