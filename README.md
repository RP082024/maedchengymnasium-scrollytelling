# Quarto scrollytelling one-pager

## Main changes in this version

- The brown Quarto title banner has been removed.
- The page now begins with a full-bleed class photograph hero.
- Section IDs are attached to the complete section containers, not to headings. This improves scroll positioning and progress-rail highlighting.
- The active-section script now calculates the current section from the section boundaries rather than observing headings.
- Three callout types have stronger, separate background and header styles.
- A contribution/contact page and an Impressum/privacy page are included and linked in the footer.

## Replace the opening image

Place your class photograph in `images/`, then change this line in `styles.css`:

```css
url("images/class-picture-placeholder.svg")
```

to, for example:

```css
url("images/class-picture.jpg")
```

Adjust `background-position` if faces are cropped unfavourably:

```css
background-position: center 35%;
```

## Contact form

`contact.qmd` contains a Formspree-compatible HTML form. It is intentionally not functional until you replace:

```html
REPLACE_WITH_YOUR_FORM_ID
```

You may instead replace the form with a link or iframe for a service you prefer. For European/open-source preferences, possible routes include a university LimeSurvey installation, Nextcloud Forms, or CryptPad Forms, depending on availability and data-protection requirements.

## Impressum

`impressum.qmd` contains visible placeholders because the required details depend on the final host, institutional affiliation, form provider, licences, and legal role. Complete these before publication.

## Callout syntax

```markdown
::: {.callout-note .callout-evidence collapse="true"}
## A descriptive title
Content, images, tables, or figures.
:::
```

Available custom classes:

- `.callout-evidence`
- `.callout-method`
- `.callout-explore`

Their colours are defined near the top of `styles.css` and their detailed styling is in section 4.

## Run

```bash
quarto preview
```
