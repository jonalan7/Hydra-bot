import latestVersion from 'latest-version';
import { upToDate } from '../utils/semver';
const { version } = require('../../../package.json');
import * as chalk from 'chalk';
import boxen from 'boxen';
let updatesChecked = false;

export async function checkUpdates() {

  if (!updatesChecked) {
    updatesChecked = true;
    return await checkVenomVersion();
  }
}

async function checkVenomVersion() {
  try {
    await latestVersion('hydra-bot').then((latest) => {
      if (upToDate(version, latest)) {
        console.log("You're up to date");
      } else {
        console.log('There is a new version available');
        logUpdateAvailable(version, latest);
      }
    });
  } catch {
    console.log(
      'Unable to access: "https://www.npmjs.com", check your internet'
    );
    return false;
  }
}

function logUpdateAvailable(current: string, latest: string) {
  // prettier-ignore
  const newVersionLog =
      `There is a new version of ${chalk.bold(`Venom`)} ${chalk.gray(current)} ➜  ${chalk.bold.green(latest)}\n` +
      `Update your package by running:\n\n` +
      `${chalk.bold('\>')} ${chalk.blueBright('npm update venom-bot')}`;
  console.log(boxen(newVersionLog, { padding: 1 }));
  console.log(
    `For more info visit: ${chalk.underline(
      'https://github.com/jonalan7/Hydra-bot/blob/master/Update.md'
    )}\n`
  );
}
