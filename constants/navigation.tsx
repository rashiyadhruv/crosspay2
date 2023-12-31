type NavigationType = {
  title: string;
  url: string;
};

const PlayNow = "/";

const NavigationList: NavigationType[] = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Exchange",
    url: "/exchange",
  },
  {
    title: "Dashboard",
    url: "/dashboard",
  },
  // {
  //   title: "Download & Play",
  //   url: "/download-and-play",
  // },
];

const NavigationListFooter: NavigationType[] = [
  {
    title: "Home",
    url: "/",
  },

  {
    title: "Exchange",
    url: "/exchange",
  },
  {
    title: "Dashboard",
    url: "/dashboard",
  },

  // {
  //   title: "Wishlist detailed",
  //   url: "/wishlist-detailed",
  // },
];

const LegalList: NavigationType[] = [
  {
    title: "Privacy policy",
    url: "/privacy",
  },
  {
    title: "Terms of services",
    url: "/faq",
  },
];

const settings = [
  {
    title: "My NFT",
    icon: "image",
    url: "/wishlist-detailed",
  },
  // {
  //     title: "Wishlist",
  //     icon: "heart",
  //     url: "/wishlist",
  //     divider: true,
  // },
  // {
  //     title: "Edit profile",
  //     icon: "edit",
  //     url: "/user-setting",
  // },
  // {
  //     title: "Settings",
  //     icon: "settings",
  //     url: "/settings",
  //     divider: true,
  // },
];

export { PlayNow, NavigationList, NavigationListFooter, LegalList, settings };
