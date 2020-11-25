# RokuWake
An attempt at working out the code to wake a sleeping Roku TV remotely

For some reason, my Roku-based TV has stopped responding to the physical remote control, even with fresh batteries.  This has meant using a cheap tablet as a remote, but when the television is in its "sleep mode,' it sometimes doesn’t respond to the wake-up commands.  So, in an attempt to streamline my mornings, I created this project, a JavaScript program that tries to find a named Roku device---by substring search or *the* Roku device, if it's the only one on the network---and send the power command and some other "do something" commands.

It works less reliably than the tablet app, unfortunately, but it does get through, on occasion.

Hopefully, someone will find this a useful starting point for something they might need.
