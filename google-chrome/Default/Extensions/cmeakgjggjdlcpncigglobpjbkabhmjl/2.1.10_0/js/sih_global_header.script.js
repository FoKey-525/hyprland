$J(function () {
  SIH_GLOBAL?.sihGlobalHeader?.navigationMenu?.loadNavigationMenu();

  const matchJoinPage = window.location.href.match(/steampowered.com\/join/);
  if (!matchJoinPage) SIH_GLOBAL?.sihGlobalHeader?.actionMenu?.LoadActionMenu();
});
