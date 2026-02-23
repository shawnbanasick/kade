import { screen } from 'electron';
import settings from 'electron-settings';

export const windowStateKeeper = async (windowName) => {
  let window, windowState;

  const setBounds = async () => {
    try {
      // Restore from appConfig
      if (await settings.has(`windowState.${windowName}`)) {
        windowState = await settings.get(`windowState.${windowName}`);
        return;
      }
    } catch (error) {
      console.error(`Failed to load window state for ${windowName}:`, error);
    }

    const size = screen.getPrimaryDisplay().workAreaSize;

    // Default
    windowState = {
      x: undefined,
      y: undefined,
      width: size.width / 2,
      height: size.height / 2,
    };
  };

  let saveStateTimer = null;

  const saveState = () => {
    clearTimeout(saveStateTimer);
    saveStateTimer = setTimeout(async () => {
      try {
        if (!windowState.isMaximized) {
          windowState = window.getBounds();
        }
        windowState.isMaximized = window.isMaximized();
        await settings.set(`windowState.${windowName}`, windowState);
      } catch (error) {
        console.error(`Failed to save window state for ${windowName}:`, error);
      }
    }, 500);
  };

  const track = async (win) => {
    window = win;
    ['resize', 'move', 'close'].forEach((event) => {
      win.on(event, saveState);
    });
  };

  await setBounds();

  return {
    x: windowState.x,
    y: windowState.y,
    width: windowState.width,
    height: windowState.height,
    isMaximized: windowState.isMaximized,
    track,
  };
};
