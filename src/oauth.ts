export type GithubCfg = {
  clientId: string;
  redirectUri: string;
  scope: string;
};

export const githubLogin = (cfg: GithubCfg) => {
  const { clientId, redirectUri, scope } = cfg;

  window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=${scope}&redirect_uri=${redirectUri}`;
};
