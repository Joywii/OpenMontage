import {Config} from '@remotion/cli/config';

// Opt in only for this project's local render; other jobs retain defaults.
if (process.env.OPENMONTAGE_PI_RENDER === '1') {
  Config.setBrowserExecutable('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome');
  Config.setChromeMode('chrome-for-testing');
  Config.setDelayRenderTimeoutInMilliseconds(30000);
  Config.setLogLevel('verbose');
}
