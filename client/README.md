## WorkOS Frontend Take Home Assignment

This was bootstrapped with Next.js. To run the project, ensure that the API server
is running on port 3002, and then run:

```bash
npm run build
npm run start
```

Then open your browser to http://localhost:3000

## If I had more time...

There's a bit of redundant pagination code between the Users list and the Roles list.
I would spend some time extracting that code into a single component with some hooks
to make it more reusable. I would also give accessability a closer look. I added aria
labels and roles to the components that I know need them, and I ensured that keyboard
navigation works, however I'm sure there's more that can be done there. I would use a
tool that checks for ADA and WCAG compliance. Also I would have liked to create a tooltip
component to give some additional context to some elements, such as the star icon on the
roles list that denotes the role is a default, as well as the "More actions" button on
the end of the list items. That said, this was a fun exercise! Thanks for your consideration.
