import { Inject } from "@nestjs/common";
import {
    TELEGRAM_MODULE_CONNECTION,
    TELEGRAM_MODULE_OPTIONS
} from "../telegram.constants";

export const InjectOptions = () => Inject(TELEGRAM_MODULE_OPTIONS);
export const InjectConnection = () => Inject(TELEGRAM_MODULE_CONNECTION);
