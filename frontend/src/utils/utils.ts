export const verifyUsername = (username: string): string | { error: string } => {
  const minLen: number = 5;
  const maxLen: number = 30;

  // check if username is empty
  if (username === "") return { error: "Username cannot be empty" };

  // check if username is too long
  if (username.length > maxLen)
    return { error: `Username cannot be longer than ${maxLen} characters` };

  // check if username is too short
  if (username.length < minLen)
    return { error: `Username cannot be shorter than ${minLen} characters` };

  // check if username contains invalid characters
  const regex: RegExp = /^[a-zA-Z0-9_]+$/;
  if (!regex.test(username))
    return {
      error: "Username can only contain letters, numbers and underscores",
    };

  // check if username contains spaces
  if (username.includes(" ")) return { error: "Username cannot contain spaces" };

  return username;
};
