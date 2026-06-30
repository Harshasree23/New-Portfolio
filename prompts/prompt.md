# Portfolio Architecture & Build Instructions

**Core Instruction:**
Act as an expert frontend architect and UI/UX designer. Build a highly responsive, single-page portfolio website using modern web technologies (HTML, CSS, JS, or a React framework). The architecture must rely on a unified "Glassmorphism" design system layered over a subtle, animated gradient background.

## 1. Global Styling & Theme (Aurora Glassmorphism)
*   **Background:** Implement a slow-moving, muted "Aurora" mesh gradient background. Use 3-4 desaturated, professional colors (e.g., deep slate blue, muted violet, soft teal). The CSS keyframe animation must be incredibly slow (15-20 seconds per cycle) so it does not distract from the content. NO EMOJIS.
*   **Glassmorphic UI System:** All foreground elements (nav, cards, bento boxes) must use a standardized glass effect. 
    *   `background: rgba(255, 255, 255, 0.05);`
    *   `backdrop-filter: blur(16px);`
    *   `border: 1px solid rgba(255, 255, 255, 0.1);`
    *   `box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);`
*   **Typography:** Clean, sans-serif Google Font (Inter or Roboto). Ensure high contrast (pure white or very light gray) for readability against the glass.

## 2. Top Navigation Bar
*   **Design:** Fixed, sticky glassmorphic header at the top of the viewport.
*   **Links:** Academics, Skills, Experience, Projects, Contact. Include smooth scrolling to the respective anchor tags.

## 3. Hero Section (Landing)
*   **Headline:** [Insert Name], displayed in a large, bold, clean font.
*   **Subheadline (Tagline):** "Full-Stack Engineer & AI Researcher translating complex mathematical models into scalable web applications."
*   **Interactive Filter Chips (The Visual Shift Engine):** Below the tagline, place a row of subtle glassmorphic toggle buttons labeled: "All", "Web Engineering", "Machine Learning & Vision", and "Operations Research". 
*   **Filter Logic:** Do NOT hide content when a chip is clicked (no `display: none`). Instead, use a CSS class toggle. If "Machine Learning" is clicked, dim the opacity of non-ML related skill and project cards to `0.3` and add a subtle glowing border `box-shadow: 0 0 15px rgba(255, 255, 255, 0.3)` to the highly relevant cards.

## 4. Skills Section (The Bento Box)
*   **Layout:** A CSS Grid "Bento Box" layout. Must be fully responsive, collapsing into a single column on mobile devices to prevent overlapping glass layers.
*   **Structure:** Create discrete glassmorphic container cards for logical categories:
    *   **Web Architecture:** React, Node.js, HTML/CSS, etc. (represented by small inline icons + text labels).
    *   **Scientific Computing & Vision:** Python, OpenCV, Scipy, Cellpose, Frangi Filters.
    *   **Mathematical Modeling:** Operations Research, GLM Models, Lasso Regression, LaTeX.

## 5. Work Experience Section
*   **Design:** Replicate the precise visual style from the provided `work_exp` prompt folder (vertical timeline with nodes/cards).
*   **Integration:** Ensure the background blur and borders of the timeline cards match the global Glassmorphism specs defined in Section 1.

## 6. Projects Section
*   **Design:** A responsive CSS Grid layout of glassmorphic cards with subtle hover scale effects (`transform: translateY(-5px)`).
*   **Content Strategy:** Each card must highlight both the "Brain" (AI/ML/Math) and the "Infrastructure" (Full-Stack). 
*   **Project 1 (Example):** "Metro Retail Optimization Framework" — A three-layer mathematical framework modeling pedestrian flow and cognitive load.
*   **Project 2 (Example):** "Calcium Imaging Analysis" — Neuronal spike flow tracking and functional connectivity estimation using high-resolution video processing.

## 7. Contact Section
*   **Design:** Replicate the precise visual style from the provided `contact` prompt folder. 
*   **Inputs:** Use floating labels inside glassmorphic input fields. Ensure high contrast for user input text.

## 8. Footer
*   **Design:** Clean, minimalist, and professional. 
*   **Content:** Standard copyright information and social links. Do NOT include any text stating the design is inspired by Apple or Google.