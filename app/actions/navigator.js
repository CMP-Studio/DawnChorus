// *** Action Types ***
export const PUSH = 'PUSH';
export const POP = 'POP';
export const JUMP_TO_KEY = 'JUMP_TO_KEY';

// *** Screen Names ***
export const ABOUT_THE_BIRDS_SCREEN = 'ABOUT_THE_BIRDS_SCREEN';
export const ALARM_LIST_SCREEN = 'ALARM_LIST_SCREEN';
export const NEW_ALARM_SCREEN = 'NEW_ALARM_SCREEN';
export const EDIT_ALARM_SCREEN = 'EDIT_ALARM_SCREEN';
export const ALARM_SCREEN = 'ALARM_SCREEN';
export const INFO_CARDS_SCREEN = 'INFO_CARDS_SCREEN';

export function navigatorPush(state) {
  return {
    type: PUSH,
    state: { key: state },
  };
}

export function navigatorPop() {
  return {
    type: POP,
  };
}

export function navigatorJumpToKey(key) {
  return {
    type: JUMP_TO_KEY,
    key,
  };
}
