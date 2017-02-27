export const SHOW_INFO_CARDS = 'SHOW_INFO_CARDS';
export const CLOSE_INFO_CARDS = 'CLOSE_INFO_CARDS';

export function showInfoCards(bird, index) {
  return {
    type: SHOW_INFO_CARDS,
    bird,
    index,
  };
}

export function closeInfoCards() {
  return {
    type: CLOSE_INFO_CARDS,
  };
}
