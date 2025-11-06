## WorkOS Frontend Take Home Assignment

This was bootstrapped with Next.js. To run the project, ensure that the API server
is running on port 3002, and then run:

```bash
npm run build
npm run start
```

Then open your browser to http://localhost:3000

## Stack

- Next.js because I needed an easy router :)
- Tailwind 4 with custom token variables, mostly due to my own familiarity and speed.
- Tanstack React query for data fetching, suspense, caching.

## Additions (beyond the task list)

- Tab/pagination/search state sync'd to the URL for bookmark-ability.
- Search results highlight the matched text
- Avatar's fallback to user's initials if image is undefined or fails to load
- Calculate users count for each role on the roles page
- API error messages are surfaced to the UI (e.g. try to remove default from the default role)
- Next / Prev pagination buttons prefetch the next page on mouse enter

## If I had more time...

- I wrote all of the component code myself. I could have grabbed shadcn or radix-ui components to save time, but I think it's more valuable to showcase my ability to build components over my ability to glue libraries together. That said, the components I wrote for this take home assignment cover the use cases for this exercise, but are not what I would consider fully baked or ready for production.
- There's a bit of redundant pagination code between the Users list and the Roles list. I would spend some time extracting that code into a single component with some hooks
  to make it more reusable.
- I would also give accessability a closer look. I added aria labels and roles to the components that I know need them, and I ensured that keyboard
  navigation works, however I'm sure there's more that can be done there. I would use a
  tool that checks for ADA and WCAG compliance.
- Also I would have liked to create a tooltip component to give some additional context to some elements, such as the star icon on the roles list that denotes the role is a default, as well as the "More actions" button on the end of the list items.
