# DeployDock

The first three steps of the guided build: local tooling, a Next.js application and the approved UI foundation. No database, authentication or live monitoring is connected yet.

## Open the application

In PowerShell:

```powershell
cd D:\Nico\DeployDock
.\dev.ps1
```

Open http://127.0.0.1:3000. Keep the terminal running; Ctrl+C stops it.

The launcher selects the portable Node 24 runtime on D: and puts temporary files and npm cache on D:. pnpm uses the project settings in `pnpm-workspace.yaml`. No global runtime or existing WSL installation was moved.

## Follow along

1. Open Overview. Zero projects and unknown health are intentional: there is no backend yet.
2. Navigate through Projects, Deployments, Incidents and Settings. These are real routes with honest empty states.
3. Use the sun/moon button to switch appearance for the current page session.
4. Narrow the window and open the navigation menu. Escape closes the drawer; keyboard focus stays inside while it is open.
5. Select New project to see which later step connects the feature. It does not create a fake record.
6. Change the subtitle in `src/components/workspace.tsx`, save, and watch the development server refresh the page.

## Useful commands

```powershell
.\dev.ps1 typecheck
.\dev.ps1 lint
.\dev.ps1 build
.\dev.ps1 start
```

`start` serves a previously built production bundle; stop the dev server first if it uses port 3000. To reinstall the pinned dependencies, use pnpm install --frozen-lockfile with the same Node and storage settings as dev.ps1.

## Source map

- `src/app/layout.tsx`: document metadata and global styles.
- `src/app/page.tsx`: overview route.
- `src/app/[section]/page.tsx`: valid navigation routes; unknown routes return 404.
- `src/components/workspace.tsx`: shell, overview and empty states.
- `src/components/ui/button.tsx`: reusable typed button and variants, with shadcn-compatible component conventions.
- `src/app/globals.css`: approved palette, typography, spacing, responsive behavior and focus styles.
- `components.json`: shadcn configuration for future components.
- `docs/STEP-01-03.md`: tool inventory, checks and checkpoint.

The approved design remains in `D:\Nico\DeployDock-Design`. The complete plan is `D:\Nico\DeployDock-Design\BUILD-PLAN.md`. Next is step 4: PostgreSQL and migrations.
