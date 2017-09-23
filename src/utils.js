// eslint-disable-next-line import/prefer-default-export
export function getActionType(action) {
  return action.type.split('#')[0];
}
