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

Specs come from these documents:

- [CLW / Hind Rectifiers IGBT propulsion manual](https://clw.indianrailways.gov.in/uploads/3phase/Operatinal%20%26%20maintance%20%26%20troubleshoting%20manual.pdf)
- [IRIMEE, Introduction to Electric Locomotive](https://rskr.irimee.in/sites/default/files/Electric%20Locomotive.pdf)
- [CLW WAG9 main transformer specification](https://clw.indianrailways.gov.in/uploads/Specification%20Main%20Trasformer%206531%20KVA.pdf)
- [RDSO loco specification](https://rdso.indianrailways.gov.in/uploads/files/Specification%20No%20RDSO_2008_EL_SPEC_0066_%20Rev_%200%20Low%20Speed%20FRIEGHT%20(1).pdf)
- [RDSO, Head on Generation paper](https://rskr.irimee.in/sites/default/files/Paper%20on%20HOG.pdf)
- [Medha hotel load converter presentation](https://rskr.irimee.in/sites/default/files/MEDHA%20HOTEL%20LOAD%20.pdf)
- [IRFCA, Inside WAP4](https://irfca.org/members/sites/zubin/WAP4.html)
