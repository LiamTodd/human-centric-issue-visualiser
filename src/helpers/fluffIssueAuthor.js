export const fluffIssueAuthor = (issue) => {
  const defaultAuthor = 'LiamTodd';
  const authorTag = 'author:';
  // set set status labels
  const labels = issue.labels;
  // uses the assumption that only one status label is applied to each issue
  let fluffedAuthor = defaultAuthor;
  labels.forEach((label) => {
    if (label.name.slice(0, 7) == authorTag) {
      fluffedAuthor = label.name.slice(7);
    }
  });
  issue.fluffedAuthor = fluffedAuthor;
};
