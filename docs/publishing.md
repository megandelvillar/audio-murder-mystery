# Publishing

Murder on Record is a static site: plain HTML, CSS and JavaScript with no build step. It can be hosted on GitHub Pages.

## Steps

1. Make sure all the files in `audio/` and `images/characters/` are pushed.
2. On GitHub, open the repository, then Settings, then Pages.
3. Under "Build and deployment", choose "Deploy from a branch".
4. Select the `main` branch and the `/ (root)` folder, then save.
5. After a minute the site is live at `https://<user>.github.io/<repository>/`.

GitHub Pages is free for public repositories. A private repository needs a paid plan.

## Checklist before sharing the link

- Play the whole game once with headphones: landing, case file, suspects, interviews, notebook and all four endings.
- Check the browser console for 404 errors. A 404 means a file name does not match the lists in `docs/sound-list.md` and the README.
- Test on a phone. The game must work with touch and without a keyboard.
- Test with the sound toggle off.

## Known limits

- The game keeps its state in memory, so reloading the page starts over.
- Answers have no written transcript, so players cannot read all of them without spending questions.
