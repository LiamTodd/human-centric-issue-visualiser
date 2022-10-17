const authorTag = 'author:';

export const fluffIssueAuthor = (issue) => {
  const labels = issue.labels;
  // uses the assumption that at most ONE fluff-author tag is applied to each issue
  let fluffedAuthor = null;
  labels.forEach((label) => {
    if (label.name.slice(0, 7) == authorTag) {
      fluffedAuthor = label.name.slice(7);
    }
  });

  // safety net: no fluff tag applied
  if (fluffedAuthor == null) {
    fluffedAuthor = issue.user.login;
  }

  issue.fluffedAuthor = fluffedAuthor;
};
