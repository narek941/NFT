# Niftable Front End Style guide 🚀

|       name       |                              link                             |
|:----------------:|:-------------------------------------------------------------:|
| project location | https://git.testserver.kiev.ua/niftables/frontend-wl-skeleton |
| jenkins          | https://jenkins.dev.niftables.com                             |
| argo             | https://argocd.dev.niftables.com                              |
## Folder structure
- All routes should be located inside pages folder
- All assets (images, icons etc) should be located in public folder
- Axios instance, interceptors and external services (payment etc) should be located in `common/api` folder
- Entity models (interfaces) should be located in `common/models`
- Useful functions (not hooks) which does not related to particular entity should be located in `common/utils` folder (jwt decode, localstorage management etc)
- Entities and components should be located in appropriate folders and described below
- React hooks should be located in hooks folder
- Databus Injector for `mock/api` management is located in the injector folder.
- Static data should be located in the static folder. We need to remove theme.ts in the near future.
- Redux storage configuration is in the storage folder
- All generic sass data (mixins, functions, theming etc) should be located in styles folder
- Interfaces and models not related to a particular entity should be stored in the types folder.
__________________________________________________________________________________________________________________
## Entities
- All interfaces (state, action payload and responses etc) related to particular entity, should be in `common/models` folder (for example, `src/common/models/nft.ts`)
- A new entity should be created inside entities folder (for example, `src/entities/nft`)
- Entity folder should contain 3 folders: `model` (abstract repository), `api` (repository implementation and injection), `redux` (redux-toolkit actions and slices)
- Model folder - Abstract repository should consist async request models
- API Folder - Here should be implementations of abstract repo (mock implementation using mocksuccess/mockerror utils or http implementation using real requests). An injector to switch between those implementations should be also here.
- Redux folder - In the actions file there should be synchronous and asynchronous actions (using `createAsyncThunk` of redux toolkit). Each action should contain one request to the backend (unless requests are dependent on each other and should be always sent in a chain). In the slice folder there should be reducers for all actions. Pending and rejected could be handled using pending or error reducer.
__________________________________________________________________________________________________________________
## Adding new entity
- Create main models, state, action payload/response interfaces in `common/models/entityName.ts`
- Create folder `src/entities/entityName` and 3 folders inside it: `api, model, redux`
- Add abstract repository to model folder (a class with abstract async methods)
- Add repository implementation in `api` folder. There could be http implementation (add requests to real api) or mock implementation (using static mock data). If some requests are ready and some are not we could implement some requests as api and other as mock (so it is very flexible)
- Add `api/inject.ts` file to manage implementations using Injector Databus. Add repo name as constant to `src/injector/constants.ts.` Include entity inject file in `src/injector/injectAll.ts` imports
- Add synchronous actions and asynchronous actions (using createAsyncThunk) to `redux/actions.ts`. All async actions here should be managed using Injector (so we could return http or mock response without making extra changes to `actions.ts` file)
- Add slice to `redux/slice.ts` file. Add initial state implementing an interface in `common/models`. We could use standard reducers (pending and error) for handling asynchronous actions (action.pending and action.rejected correspondingly). All fulfilled actions and sync actions should be handled separately. Slice reducer should be imported as default
- Import entity reducer to `storage/rootReducer.ts`. Wrap in Persist if needed.
- Check everything working using redux dev tools
__________________________________________________________________________________________________________________
## Components
- All medium and large components should be located in components folder
- All small components (button, checkbox etc) should be located in shared folder
- All components should have its story located in src/stories.
- It would be good to split big components into two parts: a logical component which is working with redux and a ui component which has props passed only. It will help to create a storybook component for the ui part mocking other props.
- Each component should have styles in styles.module.scss part
- All functions and mixins should be located in styles folder
- Breakpoints, theme colors and other sass variables should be located in styles/variables.scss
__________________________________________________________________________________________________________________
## Adding new component
- Create a folder inside components or components/shared depending on component dimension (small basic ones should be located in shared folder)
- Create index.tsx and styles.module.scss files.
- If a component is big enough and needs to use redux store we could create a third file to the folder to handle component UI there (passing props). All logic from redux should be located in another file (index.tsx) and pass props to UI level. So we will use the UI file for storybook and index.tsx file for the main project.
- If a component UI is rather big and its spare parts could be used in other component it is better to create smaller component for each spare part (there should be props and UI only) and then get it all together with logic (if needs)
- A story should be created for the UI part (stories/components for medium and large and stories/shared for basic ones). When everything is ok with UI in storybook we could continue adding a component to the real page and test it here
- Mobile adaptation could be added later. First of all we need to change styles.module.scss file adding new styles using respond-to mixin. Then we need to check the UI in the storybook. Next step is to test in the Chrome mobile view window that the component looks well in a page mock. And finally to test in a real device (both Iphone and Android would be nice).
__________________________________________________________________________________________________________________
## Git flow
* Before starting a new task. Please check if files and folders you will modify will not affect the work of other  developers in a team. If you have some doubts it would be better to ask developers and project manager about it.
  Want to contribute? Great!
* Pull latest develop branch changes
* The name of the branch should start with: feature if the task is for adding a new feature, fix or hotfix if there are some bugs and refactor if you need to change some structure and/or remove legacy code.
* The second part of branch name should be the task number (if task already exist)
* The last part is short task description
* For example, a branch could have a name feature-4444/add-stripe-integration or fix-3333/adjust-collections-page-margins
* Please run before each commit npm run lint:check and npm run format:check. Husky makes it automatically but it is good to know that everything is ok before each commit.
* When you are ready, please pull develop branch first and resolve conflicts (if any)
* Check everything for consistency: npm run dev (project is not crushing), npm run build, npm run format:check and npm run lint:check
* If everything is ok please make a MR and add another developer to check it. The only reason not to do that is urgent hotfix if other developers are very busy or not available now.
* When MR passes a review you could merge to develop. If there are any demo or other reasons not to merge please consult project manager first
* 1 commit and 1 merge commit should be added to develop branch. Please keep your branch if some incidents happen so we could restore files.
* Checkout to develop, pull the latest changes and check everything is ok.
* When stage and prod branches are added to the project this section should be rewritten.

