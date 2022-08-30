import {
  appUsageColour,
  highPriorityColour,
  inclusivenessColour,
  lowPriorityColour,
  mainTheme,
  mediumPriorityColour,
  noHCIIdentifiedColour,
  resolvedColour,
  resolvingColour,
  unresolvedColour,
  userReactionColour
} from '../theme/hexCodes';

const prefix = 'HCIV: ';
export const noHCIIdentifiedLabel = {
  name: prefix + 'Non Human-Centric',
  description:
    'This issue does not contain human-centric discussion - Human Centric Issues dashboard.',
  color: noHCIIdentifiedColour
};

export const userReactionLabel = {
  name: prefix + 'User Reaction',
  description:
    'This issue contains discussion around user reaction - Human Centric Issues dashboard.',
  color: userReactionColour
};
export const inclusivenessLabel = {
  name: prefix + 'Inclusiveness',
  description:
    'This issue contains discussion around inclusiveness - Human Centric Issues dashboard.',
  color: inclusivenessColour
};
export const appUsageLabel = {
  name: prefix + 'App Usage',
  description:
    'This issue contains discussion around app usage- Human Centric Issues dashboard.',
  color: appUsageColour
};

export const unresolvedHCILabel = {
  name: prefix + 'Unresolved',
  description:
    'This issue is unresolved. This label was created by the Human Centric Issues dashboard.',
  color: unresolvedColour
};
export const resolvingHCILabel = {
  name: prefix + 'Resolving',
  description:
    'This issue is currently being resolved - Human Centric Issues dashboard.',
  color: resolvingColour
};
export const resolvedHCILabel = {
  name: prefix + 'Resolved',
  description: 'This issue has been resolved - Human Centric Issues dashboard.',
  color: resolvedColour
};

export const lowPriorityLabel = {
  name: prefix + 'Low Priority',
  description:
    'This issue is a low priority item - Human Centric Issues dashboard.',
  color: lowPriorityColour
};
export const mediumPriorityLabel = {
  name: prefix + 'Medium Priority',
  description:
    'This issue is a medium priority item - Human Centric Issues dashboard..',
  color: mediumPriorityColour
};
export const highPriorityLabel = {
  name: prefix + 'High Priority',
  description:
    'This issue is a high priority item - Human Centric Issues dashboard.',
  color: highPriorityColour
};
