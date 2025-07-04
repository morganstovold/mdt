interface DebugEvent {
  action?: string;
  level?: number;
  data: any;
}

/**
 * Send an event and debug content for the logger according to the config values found in the
 * `config/default.json`. Lower log level means more verbose logs.
 *
 * @param event A debug log object
 * @param event.name The name of the event to log
 * @param event.level The level of this debug log (1-5 ideally)
 * @param event.content The content of whatever
 **/

export function LogDebugEvent(event: DebugEvent) {
  const logLevel = event.level || 1;
  const name = event.action || 'Undefined action';

  if (process.env.NODE_ENV === 'development') {
    console.group(`${name} | Level: ${logLevel}`);
    console.dir(event.data);
    console.groupEnd();
  }
}
