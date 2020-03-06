// ref: https://react.semantic-ui.com/modules/transition/#types-group
const names = ["ade", "chris", "christian", "daniel", "elliot", "helen"];
export const getUrlAvatar = name =>
  `https://react.semantic-ui.com/images/avatar/small/${name}.jpg`;

export const getAvatars = noUsers => {
  let avatars = [];
  const sliceName = n => names.slice(0, n);

  if (noUsers > names.length) {
    const diff = noUsers - names.length;
    const getNames = sliceName(diff).reverse();
    avatars.push(...names);
    avatars.push(...getNames);
  } else avatars.push(sliceName(noUsers));

  return avatars.map(name => getUrlAvatar(name));
};
