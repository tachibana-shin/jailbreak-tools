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
  ipa: "https://download.wetransfer.com//usgv/17726b2a72f2317e94e61fc79c87375420191120041032/b0002ff3f2623458bdb17342b662e31e28fda8ee/h3lix-RC6.ipa?cf=y",
  links: [
    "https://iosninja.io/plist/in/a1178/h3lix.plist",
    "https://iosninja.io/plist/in/a115/h3lix.plist",
    "https://dzmohaipa.com/Jb2017/h3lix.plist",
    "https://ammaripa.com/files/H3lix.plist",
    "https://ipa-apps.me/plist/H3lix.plist",
    "https://achlhi.com/jailbreak/plist/h3lix.plist",
    "https://achlhi.com/jailbreak/plist111/h3lix.plist",
    "https://achlhi.com/jailbreak/plist112/h3lix.plist",
    "https://achlhi.com/jailbreak/plist114/h3lix.plist",
    "https://cydiaabdullah.com/App/plist/H3lix.plist",
    "https://ipa.kenhtao.net/plists/h3lix.plist",
  ],
  name: "h3lix",
  patch: [
    {
      name: "Bypass DRM",
      description:
        "Make h3lix work when installed not-via-Impactor. To be used with the latest h3lix.",
      url: "https://gist.github.com/jakeajames/b44d8db345769a7149e97f5e155b3d46",
    },
  ],
  support: "10",
  version: "1.0 RC6",
  website: "https://h3lix.tihmstar.net/",
});
