# WAP4 vs WAP7

A small website comparing two Indian Railways electric locomotives: the WAP4, which uses a tap changer and DC motors, and the WAP7, which uses IGBT converters and three-phase motors.

It has three pages:

- **Layout**: where the equipment sits in each machine room. Tap any block for details.
- **Power flow**: how power moves through each loco when motoring and when braking.
- **Drive**: a simple simulator. Drive both locos from 0 to 110 km/h, change the line voltage and see how each one responds.

The simulator is a rough model built from published ratings. It is not a certified simulation.

## Running it

Open `index.html` in a browser, or serve the folder with any static file server. There is no build step.

## Sources

Specs come from Indian Railways, RDSO and IRFCA documents. The links are listed in `CLAUDE.md`.
