# NotifyMe
NotifyMe (alias `Re-Mind-Me`) is a Node.js App that reads specific data from a .xlsx file and displays it as Windows notifications. 

It is designed to be used as a Reminder with Windows Scheduled Tasks.

## Project Considerations

### Purpose
This app has been develop in order to practice the .xlsx files reading and OS notifications usage with Node.js

### Data structure in .xlsx file
The events schema in the .xlsx file MUST be the following

|NOMBRE   |DESCRIPCION   |HORA(S) DE ACTIVACION   |ACTIVADO   |
|---|---|---|---|
| recordatorio1  | descripcion1  |20:10,21:33   |   |
| recordatorio2  | descripcion2  |08:11   | true  |
| recordatorio3  |   |21:10,09:33   | false  |

> :warning: The headers names are irrelevant **BUT the order is important**

> :clock10: "Hora(s) de activacion" must be an string of times in format `hh:mm` (military time) separated by commas. For example, `08:33,20:33`. If format is not complied, the event will be ignored

## Getting Started

After cloning the repository, install all the dependencies:

```bash
npm install

# or

yarn
```

Build the JS files

```bash
npm run build

# or

yarn build
```

Finally, execute the app by running the `run.cmd` file or using the npm command

```bash
run.cmd

# or which is equivalent as

npm start events.xlsx
```
> :eyes: **"events.xlsx"** argument could be changed with any absolute or relative path to a valid .xlsx file

## Logging

An `app.log` file will be created once executed the program. There you'll be able to see some useful information such as errors, or the already notified "events" (which is how I called the "entity" to be in the notification).
