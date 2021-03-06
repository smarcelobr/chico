import {AppRootContainer} from "./AppRootContainer";
import {UI_DiscordContainer} from "./ui/discord/UI_DiscordContainer";
import {UI_WebappContainer} from "./ui/webapp/UI_WebappContainer";
import {CliContainer} from "./cli/CliContainer";

console.log('Aplicação iniciada!');

let rootContainer = new AppRootContainer();

let chicoDiscordApp = new UI_DiscordContainer(rootContainer.estudosDAO);
chicoDiscordApp.run();

let chicoWebApp = new UI_WebappContainer(rootContainer);
chicoWebApp.run();