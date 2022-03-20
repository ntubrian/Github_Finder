const pageAccessedByReload = () => {
  const reload =
    (window.performance.navigation &&
      window.performance.navigation.type === 1) ||
    window.performance
      .getEntriesByType("navigation")
      .map((nav) => nav.type)
      .includes("reload");
  return reload;
};

export default pageAccessedByReload;
