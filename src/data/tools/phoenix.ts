import { configure } from "../schema";

export default configure({
  author: [
    {
      name: "tihmstar",
      twitter: "tihmstar",
    },
    {
      name: "siguza",
      twitter: "s1guza",
    },
  ],
  ipa: "https://phoenixpwn.com/download.php",
  links: [
    "https://iosninja.io/plist/in/a1178/phoenix.plist",
    "https://iosninja.io/plist/in/a115/phoenix.plist",
    "https://ammaripa.com/files/Phoenix9.3.6.plist",
    "https://dzmohaipa.com/Jb2017/Phoenix5.plist",
    "https://achlhi.com/jailbreak/plist/phoenix.plist",
    "https://achlhi.com/jailbreak/plist111/phoenix.plist",
    "https://achlhi.com/jailbreak/plist112/phoenix.plist",
    "https://achlhi.com/jailbreak/plist113/phoenix.plist",
    "https://cydiaabdullah.com/App/plist/Phoenix.plist",
  ],
  name: "Phoenix",
  patch: [
    {
      description: "We told you to save your blobs.",
      name: "PhoenixNonce",
      url: "https://github.com/Siguza/PhoenixNonce",
    },
  ],
  support: "9",
  version: "5.0 RC6",
  website: "https://phoenixpwn.com/",
});
