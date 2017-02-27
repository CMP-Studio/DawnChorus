export const UPDATE_SCREEN_READER_STATUS = 'UPDATE_SCREEN_READER_STATUS';

export function updateScreenReaderStatus(status) {
  return {
    type: UPDATE_SCREEN_READER_STATUS,
    status,
  };
}
