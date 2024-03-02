# mwzCooldown

This React app keeps track of remaining time for cooldowns when crafting schematics in Modern Warfare Zombies (MWZ).

The goal of this app is to see how much time is remaining for specific cooldowns without having to open the game.
All unlocking and crafting still has to happen in-game.

Once a schematic has been unlocked in the game, it can be marked unlocked in mwzCooldowns. Unlocked schematics can be crafted and a timer will start based on the in-game time cooldown. If a schematic was crafted in-game and is still on cooldown, it can be crafted in the app and then manually edited to reflect the correct cooldown time remaining.

Further, schematics can be favorited to make them easier to find.

## Demo
- <a href="https://mwz.henr1k.com/" target="_blank">Check out the demo</a>

## Screenshots

![Active Cooldowns](/screenshots/active.png?raw=true "Active Cooldowns")
<br />
![Ready to Craft](/screenshots/ready2craft.png?raw=true "Ready to Craft")
<br />
![Locked Schematics](/screenshots/locked.png?raw=true "Locked Schematics")
<br />
![Editable Timer](/screenshots/edit.png?raw=true "Editable Timer")


## Further Development
- User login system
  - track cooldowns per user
  - add profile page
- Notifications
  - when a cooldown timer is over
  - when nothing is on cooldown
- Light mode and toggle between dark and light mode

## Frontend
- <a href="https://react.dev/" target="_blank">React</a>
- <a href="https://www.npmjs.com/package/axios" target="_blank">Axios</a>
- <a href="https://www.npmjs.com/package/moment" target="_blank">Moment</a>
- <a href="https://www.npmjs.com/package/react-router-dom" target="_blank">React Router Dom</a>
- <a href="https://getbootstrap.com/" target="_blank">Bootstrap</a>
- <a href="https://fontawesome.com/" target="_blank">Font Awesome</a>
- <a href="https://aws.amazon.com/s3/" target="_blank">AWS S3</a>
- <a href="https://www.cloudflare.com/" target="_blank">Cloudflare</a>

## Backend
- <a href="https://www.mongodb.com/atlas/database" target="_blank">MongoDB Atlas Database</a>

## Author
- <a href="https://henr1k.com/" target="_blank">Henr1k</a>

## License

This project is released under [MIT License](LICENSE).
