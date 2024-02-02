export type Song = {
  id: string;
  name: string;
  artists: { name: string }[];
  external_urls: {
    spotify: string;
  };
  album: {
    images: { height: number; width: number; url: string }[];
  };
};

export type User = {
  country: string;
  display_name: string;
  email: string;
  explicit_content: {
    filter_enabled: boolean;
    filter_locked: boolean;
  };
  external_urls: { spotify: string };
  followers: { href: string; total: number };
  href: string;
  id: string;
  images: Image[];
  product: string;
  type: string;
  uri: string;
};

type Image = {
  url: string;
  height: number;
  width: number;
};
