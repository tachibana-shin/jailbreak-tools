type T = {
  name: string;
  author: {
    name: string;
    twitter?: string;
  }[];
  version: string;
  support: string;
  links: string[];
  website?: string;
  github?: string;
  ipa: string;
  patch?: {
    url: string;
    description: string;
    name: string;
  }[];
};

export async function configure(data: T): Promise<
  T & {
    icon: string;
  }
> {
  const icon = await import(
    `../assets/icon-jb/${data.name.toLocaleLowerCase().replace(" ", "-")}.png`
  );
  return Object.assign({}, data, {
    icon: icon.default,
  });
}
