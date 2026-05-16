# Workflow Dashboard — Power Platform Deployment Guide

## App Overview

A React + TypeScript workflow tracking dashboard with:
- **Workflow cards** with expandable stages
- **Click-to-toggle** stage status (Pending → In Progress → Complete)
- **Progress tracking** with stats bar
- **Add new workflows** dynamically
- **Responsive grid** layout
- **No external dependencies** — pure React, works offline

## Build Output

Built files are in `/root/powerplatform-app/dist/`:
- `index.html` — entry point
- `assets/index-*.js` — bundled JavaScript (195KB)
- `assets/index-*.css` — bundled CSS (4KB)

---

## Power Platform Deployment Options

### Option 1: Power Pages (Public Website)

Best for: External-facing dashboards, customer portals

**Steps:**
1. Go to [Power Pages](https://make.powerpages.microsoft.com/)
2. Open your site → **Edit** → **Pages**
3. Add a new page → Select **"Custom"**
4. In the page editor, click **"Source code"** (</> icon)
5. Replace the content with the contents of `dist/index.html`
6. Upload `assets/index-*.js` and `assets/index-*.css` to Power Pages **Web Files**
7. Update the `<script>` and `<link>` paths in the HTML to point to uploaded files

**Alternatively — inline everything:**
```bash
cd /root/powerplatform-app
cat dist/assets/index-*.css > inline.css
cat dist/assets/index-*.js > inline.js
```
Then inline the CSS and JS directly into the HTML file for single-file deployment.

### Option 2: Power Apps Canvas App (PCF Component)

Best for: Internal business apps, embedded in Teams/SharePoint

**Steps:**
1. Install [Power Apps CLI](https://docs.microsoft.com/en-us/powerapps/developer/component-framework/implementing-controls-using-powerapps-cli-tool)
2. Create PCF component:
   ```bash
   pac pcf init --namespace MyNamespace --name WorkflowDashboard --template field
   ```
3. Copy the built `dist/` files into the PCF component's output folder
4. Update the component manifest to reference the bundled files
5. Build and publish:
   ```bash
   pac pcf push --publisher-prefix myprefix
   ```

### Option 3: Power Apps Embedded (iFrame)

Quickest path for testing:

1. Host the `dist/` folder on any static hosting (Azure Static Web Apps, GitHub Pages, Vercel)
2. In Power Apps, add an **"HTML text"** control
3. Use `<iframe src="YOUR_HOSTED_URL">` to embed

---

## Quick Test (Local)

```bash
cd /root/powerplatform-app
npm run preview
# Or serve dist/ folder
python3 -m http.server 8080 --directory dist/
```

Then open http://localhost:8080

---

## Data Integration (Optional)

To connect to Power Platform data sources:

1. **Power Automate** — Create a flow that reads/writes to Dataverse
2. **REST API** — Use `fetch()` in the React app to call Power Automate HTTP triggers
3. **PCF Dataverse** — Bind the PCF component directly to Dataverse tables

Replace the static `defaultWorkflows` in `src/data.ts` with API calls:
```typescript
useEffect(() => {
  fetch('https://your-flow-trigger-url.com/workflows')
    .then(r => r.json())
    .then(data => setWorkflows(data));
}, []);
```

---

## Files

| File | Purpose |
|------|---------|
| `src/App.tsx` | Main app component |
| `src/App.css` | All styling |
| `src/data.ts` | Demo workflow data |
| `src/types.ts` | TypeScript interfaces |
| `src/components/WorkflowCard.tsx` | Workflow card UI |
| `src/components/StageItem.tsx` | Stage indicator UI |
| `dist/` | Production build output |

---

## Next Steps

1. Choose deployment option above
2. For Power Pages: Upload `dist/` files and update HTML paths
3. For PCF: Convert to component framework format
4. For Dataverse: Add API integration to sync with Power Platform data

Want me to help with any specific step?
