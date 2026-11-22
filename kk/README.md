# A Special Delivery for Dr. Panda

An interactive 2D anime chibi animated birthday story set in a candlelit Hogwarts-inspired medical ward, featuring a Hufflepuff-scarf wizard panda postal courier, an evasive `IGNORE` button, an animated wax-seal unrolling sequence, and a cursive parchment scroll.

## Adding Your Birthday Letter

Open `src/data/letter.ts` and follow the commented-out template inside that file:

1. Comment out or remove the blank `LETTER_CONTENT` export at the bottom.
2. Uncomment the example `LETTER_CONTENT` block and replace the strings with your message (using backticks `` `...` `` lets you paste long multi-paragraph letters with apostrophes and line breaks easily).
3. Save the file and push to GitHub—the site automatically rebuilds and updates.

## Publishing to GitHub Pages

This project is pre-configured with relative asset paths (`base: './'`) and an automated GitHub Actions workflow (`.github/workflows/deploy.yml`), so it works under any `https://<username>.github.io/<repo-name>/` URL without extra configuration.

1. **Create a GitHub repository** (for example, `dr-panda-birthday`).
2. **Upload or push these project files** to the `main` (or `master`) branch.
3. **Enable GitHub Pages with GitHub Actions**:
   - Open your repository on GitHub and go to **Settings → Pages**.
   - Under **Build and deployment → Source**, select **GitHub Actions**.
4. **Wait for the workflow to finish**:
   - Check the **Actions** tab (`Deploy to GitHub Pages`).
   - Once complete, your live webpage will be published at `https://<your-username>.github.io/<your-repo-name>/`.

## Local Development

```bash
npm install
npm run dev
```

To create a production static build locally in `dist/`:

```bash
npm run lint
npm run build
```
