# Maximino Phiri – Student Portfolio

A personal portfolio website built for ICT251 Web Technologies (Activity 3) at Mulungushi University, using plain HTML5, CSS and JavaScript.

**Live website:** (paste your Render link here after deployment)

## About the website

The site introduces me as a second-year Computer Science student who wants to become a Front-End Developer. It has these sections: Home, About Me, My Hobbies, My Learning Plan (with a weekly table), Projects and Skills, My Photos, My Media (video and audio) and Contact. The layout is responsive and works on phones and computers.

## Folder structure

```
index.html
css/styles.css
js/script.js
images/   (photo1.jpeg, photo2.jpeg, photo3.jpeg)
videos/   (intro.mp4, voice.mp3)
```

## JavaScript features

1. **Contact form validation and preview (compulsory):** checks the name, email and message when the form is submitted. Spaces-only text and badly formatted emails are rejected with messages next to the fields. A valid form shows a preview on the page. Nothing is sent anywhere; it is a browser demonstration only.
2. **Expandable project details:** each card in Projects and Skills has a button that opens and closes its details and shows an open or closed state.
3. **Photo gallery viewer:** Previous and Next buttons change the photo, caption and counter. After the last photo it goes back to the first, and the reverse for Previous.
4. **Theme switch:** a button switches between light and dark themes. The choice is remembered in the browser.

## How to test the features

1. **Form:** press the submit button with empty fields, with spaces only, and with an invalid email such as `abc`. Each should show an error. Then enter valid details and check that a preview appears.
2. **Projects:** click Show Details and Hide Details on each card.
3. **Gallery:** click Next and Previous several times, including past the first and last photo.
4. **Theme:** click the theme button and check that the text stays readable in both themes. Refresh the page to see that the choice is kept.

## Sources

- Page structure and CSS written by me, following the ICT251 course notes and activity instructions.
- MDN Web Docs (https://developer.mozilla.org) for HTML, CSS and JavaScript reference.
- Photos, video and audio were created by me.
