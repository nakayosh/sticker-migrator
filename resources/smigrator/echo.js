import Echo from 'laravel-echo';

export function connectEcho(channel) {
  return (dispatch, getState) => {
    const echo = new Echo({
      broadcaster: 'socket.io',
      host: window.location.hostname + ':4000',
    });

    echo.private(channel).listen('StickerComlileStarting');
    echo.private(channel).listen('StickerCompiling');
    echo.private(channel).listen('StickerCompiled');
    echo.private(channel).listen('StickerUploadStarting');
    echo.private(channel).listen('StickerUploading');
    echo.private(channel).listen('StickerUploaded');
    echo.private(channel).listen('StickerUploadFailed');
  };
}
