# Maximino Phiri – Student Portfolio

A personal portfolio website built for ICT251 Web Technologies (Activity 3) at Mulungushi University, using plain HTML5, CSS and JavaScript.

**Live website:** https://maximino-202500391-portfolio.onrender.com

**Source code:** https://github.com/mino112005/myweb

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

1. **Contact form validation and preview (compulsory):** checks the name, email and message when the form is submitted. Spaces-only text and badly formatted emails are rejected with messages next to the fields. A valid form shows a preview on the page saying the data was validated. Nothing is sent anywhere; it is a browser demonstration only.
2. **Expandable project details:** each project card has a button that opens and closes its details and shows an open or closed state.
3. **Photo gallery viewer:** Previous and Next buttons change the photo, caption and counter. After the last photo it goes back to the first, and the reverse for Previous.
4. **Dark / light theme switch:** a button in the header switches between light and dark appearance. The choice is remembered in the browser.
5. **Project search and category filter:** visitors can search the skills and filter them by category (All, HTML, CSS, JavaScript, Tools). A Reset button clears the filters, and a message appears when nothing matches.
6. **Corner menu:** a menu button in the top corner opens and closes the navigation. It closes after choosing a link, with the Escape key, or when clicking outside it.

## How to test the features

1. **Form:** press the submit button with empty fields, with spaces only, and with an invalid email such as `abc`. Each should show an error. Then enter valid details and check that a preview appears.
2. **Expandable details:** click Show Details and Hide Details on each card.
3. **Gallery:** click Next and Previous several times, including past the first and last photo.
4. **Theme:** click the Dark Mode button and check that text stays readable in both modes. Refresh to see that the choice is kept.
5. **Search and filter:** click each category button, type a word such as `forms`, type a word that does not exist such as `zzz` to see the no-results message, then press Reset.
6. **Menu:** open the menu, click a link, and try closing it with the Escape key.

## Sources

- Page structure, styling and scripts written by me, following the ICT251 course notes and activity instructions.
- MDN Web Docs (https://developer.mozilla.org) for HTML, CSS and JavaScript reference.
- The layout idea was inspired by a student web design shown on social media; all code and content are my own.
- Photos, video and audio were created by me.