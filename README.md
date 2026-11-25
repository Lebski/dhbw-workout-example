# Rep — a small workout tracker

A small demo for learning modern JavaScript through React and TypeScript. Log workouts, search and filter entries, and explore weekly activity. Everything is saved in your browser with `localStorage`; there is no account or backend.

## Run the app

```sh
pnpm install
pnpm dev
```

Open http://localhost:3000. Six sample workouts appear on your first visit. You can delete them and add your own. Clearing browser storage resets the demo; entries do not synchronize across browsers or devices.

## Interesting parts to explore

The order below works as a walkthrough: start with the page structure, follow a workout through the app, then look at how the browser remembers it. Links point to the relevant source lines on GitHub; in a local editor, open the linked file and jump to the indicated line. Line numbers reflect the current code and may move as you edit it.

### 1. Components: building a page from smaller pieces

**Code:** [Page composition — index.tsx, line 87](src/routes/index.tsx#L87), [reusable statistic card — Stat.tsx, line 3](src/components/workouts/Stat.tsx#L3).

**Why it is interesting:** A React component is a function that returns JSX, a syntax for describing UI inside JavaScript. `App` assembles the page from named components. The same `Stat` component renders three different cards using different inputs, which shows why splitting a page makes it easier to reuse and understand.

**Show it:** Find `<Stat>` in [WeeklyOverview.tsx, line 74](src/components/workouts/WeeklyOverview.tsx#L74), then change one card's label or detail text.

### 2. Props and callbacks: how components communicate

**Code:** [Passing props — index.tsx, line 89](src/routes/index.tsx#L89), [receiving props — Sidebar.tsx, line 3](src/components/workouts/Sidebar.tsx#L3), [handling a click — Sidebar.tsx, line 26](src/components/workouts/Sidebar.tsx#L26).

**Why it is interesting:** Data flows from the parent into a child through props. A child can request a change by calling a callback supplied by its parent. `Sidebar` receives the current view and calls `onViewChange`; `App` owns the actual view state. This is the same pattern used for deleting and submitting workouts.

**Show it:** Click **My workouts** and trace the click from `onViewChange('Workouts')` back to `setView` in `App`.

### 3. State: remembering values and updating the screen

**Code:** [Shared state — index.tsx, line 20](src/routes/index.tsx#L20), [local search and filter state — WorkoutList.tsx, line 28](src/components/workouts/WorkoutList.tsx#L28).

**Why it is interesting:** `useState` returns a value and a setter, unpacked with array destructuring: `[search, setSearch]`. Calling the setter causes React to render with the new value. Shared workout data belongs in `App`; search text belongs in `WorkoutList`, where it is used.

**Show it:** Type into the search box. Its `value` comes from state, and `onChange` updates that state: [WorkoutList.tsx, line 67](src/components/workouts/WorkoutList.tsx#L67).

### 4. Forms and events: turning user input into an object

**Code:** [The form — WorkoutForm.tsx, line 15](src/components/workouts/WorkoutForm.tsx#L15), [submission handler — index.tsx, line 61](src/routes/index.tsx#L61).

**Why it is interesting:** `onSubmit` receives an event. `preventDefault()` prevents a page reload, `FormData` reads named inputs, and `String` / `Number` convert values into the expected types. An object literal collects the fields, while `crypto.randomUUID()` creates an ID. The category select uses React state; the other inputs are read on submission.

**Show it:** Log a workout and follow the values from the named inputs into the new `workout` object.

### 5. Immutable updates: adding and deleting without changing the old array

**Code:** [Adding an entry — index.tsx, line 76](src/routes/index.tsx#L76), [deleting an entry — index.tsx, line 82](src/routes/index.tsx#L82).

**Why it is interesting:** `[workout, ...current]` uses spread syntax to build a new array. `filter` creates another new array when removing an entry. The functional setter, `setWorkouts(current => ...)`, calculates the update from the latest state. These patterns keep React updates predictable.

**Show it:** Add an entry, then delete it. Compare the two state updates: both return a new array rather than using `push` or `splice` on the existing one.

### 6. Array methods: filtering, sorting, and rendering lists

**Code:** [Search and sorting — WorkoutList.tsx, line 30](src/components/workouts/WorkoutList.tsx#L30), [rendering rows — WorkoutList.tsx, line 86](src/components/workouts/WorkoutList.tsx#L86).

**Why it is interesting:** `filter` selects matching entries, `sort` orders them by date, and `map` turns them into JSX rows. Arrow functions describe what happens to each item. Although `sort` mutates its array, it is safe here because `filter` has already created a new array. Each row uses `workout.id` as its stable React `key`.

**Show it:** Combine a category filter with a search term. Both conditions must match for a workout to appear.

### 7. Derived data: calculating totals instead of storing duplicates

**Code:** [Weekly calculations — WeeklyOverview.tsx, line 35](src/components/workouts/WeeklyOverview.tsx#L35).

**Why it is interesting:** `reduce` adds workout minutes into one total. `new Set(...)` counts unique workout dates, so two workouts on the same day count as one active day. These values are calculated from `workouts` rather than kept in separate state, which means they stay consistent when entries change.

**Show it:** Add two workouts on the same date. The workout count and total minutes increase, while the active-day count increases at most once.

### 8. Conditional rendering: showing UI that fits the data

**Code:** [Strength-only fields — WorkoutForm.tsx, line 61](src/components/workouts/WorkoutForm.tsx#L61), [empty results — WorkoutList.tsx, line 149](src/components/workouts/WorkoutList.tsx#L149), [overview visibility — index.tsx, line 104](src/routes/index.tsx#L104).

**Why it is interesting:** `condition && <Component />` displays content only when a condition is true. Ternary expressions choose between two alternatives. These are ordinary JavaScript expressions inside JSX, used to show relevant form fields, alternate views, and helpful empty states.

**Show it:** Switch the workout category from **Strength** to **Cardio**, then search for a name that does not exist.

### 9. Effects, JSON, and browser storage: remembering workouts after refresh

**Code:** [Loading and saving — index.tsx, line 30](src/routes/index.tsx#L30), [saved-data validation — workouts.ts, line 87](src/lib/workouts.ts#L87).

**Why it is interesting:** `useEffect` synchronizes React with a browser API. The first effect reads saved data after mounting; another saves when workouts change. `JSON.stringify` turns the array into text, and `JSON.parse` restores it. The `loaded` flag prevents the initial empty state from overwriting saved entries. `try/catch` handles storage or parsing failures, and `isWorkout` checks the restored data's shape.

**Show it:** Add a workout and refresh the page. Then find the `rep-workouts-v1` entry in your browser's local storage inspector.

### 10. Refs and native dialogs: working with a browser element

**Code:** [WorkoutDialog.tsx, line 15](src/components/workouts/WorkoutDialog.tsx#L15).

**Why it is interesting:** `useRef` holds a reference to the actual `<dialog>` element. An effect translates the `open` prop into browser methods, `showModal()` and `close()`. Optional chaining (`?.`) avoids calling a method before the element exists. The browser handles modal focus and Escape; `onCancel` updates React state to match.

**Show it:** Open **Log workout**, move through the fields with Tab, and close it with Escape.

### 11. Effect cleanup: keeping temporary behavior tidy

**Code:** [Notification timeout — index.tsx, line 55](src/routes/index.tsx#L55).

**Why it is interesting:** A timeout clears the success notification after 3.5 seconds. The function returned from the effect cancels that timeout before the effect runs again or the component unmounts. Without cleanup, an older timer could clear a newer notification too early.

**Show it:** Log a workout and watch the notification disappear automatically. Read the effect's setup and cleanup together.

### 12. TypeScript and modules: describing data and sharing code

**Code:** [Workout type and exports — workouts.ts, line 1](src/lib/workouts.ts#L1), [typed component props — WorkoutList.tsx, line 17](src/components/workouts/WorkoutList.tsx#L17), [runtime validation — workouts.ts, line 87](src/lib/workouts.ts#L87).

**Why it is interesting:** `Workout` describes the expected fields, and typed props describe a component's inputs and callbacks. `export` and `import` share definitions between files. Types help the editor catch mistakes, but disappear at runtime, which is why parsed browser data still needs validation. The return type `value is Workout` tells TypeScript what a successful validation means.

**Show it:** Temporarily pass a string instead of a number to `workoutCount` in `App`. Notice the editor error, then undo the change.

## Checks

```sh
pnpm exec tsc --noEmit
pnpm exec eslint src/routes/index.tsx src/routes/__root.tsx src/components/workouts src/lib/workouts.ts
pnpm build
```
