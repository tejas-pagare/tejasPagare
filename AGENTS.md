# AI Agent Instructions for Portfolio Generation

**Role:** Expert Next.js Frontend Engineer & UI/UX Developer.

**Task:** You are provided with UI mockup images located in the `./design/` folder. Your objective is to analyze these images and convert them into a fully functional, pixel-perfect, multi-page Next.js application.

## 1. Tech Stack & Architecture
* **Framework:** Next.js (App Router)
* **Styling:** Tailwind CSS + shadcn/ui
* **Animations:** Framer Motion
* **Icons:** Lucide React
* **Aesthetic:** Dark mode default (Zinc-950 background, Zinc-50 text, strict 1px Zinc-800 borders).

## 2. Image Processing & Implementation Rules
* **Visual Accuracy:** Carefully analyze the images in the `design/` folder. Replicate the spacing, padding, margin, and typography hierarchy exactly as shown in the mockups.
* **Component Driven:** Do not hardcode repeated elements. Create a generic `<ProjectCard />` and `<TimelineNode />` component.
* **shadcn/ui Mapping:** Identify standard UI elements in the images (buttons, input fields, badges, cards) and implement them using the official `shadcn/ui` component CLI (`npx shadcn-ui@latest add ...`).

## 3. Dynamic Data Rendering (Generic Projects)
* **JSON Data Source:** You must make the project section completely generic and decoupled from the UI. Create a `data/projects.json` file. 
* **Dynamic Routing & Mapping:** The `/projects` grid and `/projects/[slug]` detail pages must fetch and render their content EXCLUSIVELY from this JSON file. Do not hardcode any specific project text or images into the React components.
* **Component Injection:** The UI must map over the JSON array and pass the necessary props down to the generic `<ProjectCard />` component.

## 4. Strict Content & Copywriting Rules (CRITICAL)
When structuring the JSON data or generating placeholder text, you MUST adhere to the following constraints to ensure the portfolio is ATS-optimized:
* **Action Verbs:** Always prioritize strong keywords like **"Developed"** and **"Achieved"** in bullet points and project descriptions.
* **Spelling:** Ensure precise spelling at all times. The word **"Development"** must strictly be spelled correctly (never "Devlopment").
* **Experience Metrics:** When building the experience section (specifically for the Soundverse AI role), you must explicitly include the metric: **"Achieved a 20% increase in user retention"** regarding the email automation work.

## 5. Micro-Interactions (Framer Motion)
Based on the visual cues in the design images, implement the following motion rules:
* **Page Transitions:** Apply an entrance animation of `opacity: 0, y: 20` to `opacity: 1, y: 0` (duration 0.4s, easeOut) when navigating between routes (`/`, `/projects`, `/experience`, `/contact`).
* **Hover States:** Implement a `translateY(-2px)` lift on interactive cards. 
* **Image Reveals:** Any hero images or project thumbnails should have a subtle `scale: 1.05` hover effect inside an `overflow-hidden` container.

## 6. Execution Steps for the Agent
1. Read and comprehensively analyze all images in the `./design/` directory.
2. Initialize the necessary `shadcn/ui` components based on the visual requirements.
3. Create the `data/projects.json` file to store all project data, meticulously adhering to the strict copywriting rules outlined in Section 4.
4. Build the global layout, including the floating navigation pill and footer.
5. Construct each page route (`/`, `/projects`, `/projects/[slug]`, `/experience`, `/contact`), ensuring the project pages are strictly rendering data dynamically from the JSON file.