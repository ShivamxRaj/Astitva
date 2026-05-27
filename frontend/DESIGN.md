# Design System Strategy: The Compassionate Beacon

## 1. Overview & Creative North Star: "The Compassionate Beacon"
This design system is built upon the North Star of **"The Compassionate Beacon."** For a platform like Avyakta dedicated to reporting unclaimed deceased persons and reuniting families, trust, empathy, and absolute clarity are paramount. 

We avoid the clinical sterility of raw medical portals and the starkness of brutalist layouts. Instead, we embrace an **Empathetic Humanitarian** aesthetic. This uses soft warm colors, deep solemn blues, and clear serif display typefaces to create an environment that feels respectful, safe, and professional.

---

## 2. Colors: Respectful and Clear
Our palette uses deep solemn blues and accessibility-first accents to represent trust, hope, and clarity.

### Surface Hierarchy & Nesting
*   **Base Page Background:** `surface` (#F5F0E8) - A soft, warm off-white that reduces eye strain.
*   **Primary Containers:** `surface-container-low` (#EDF2F7) - A clean slate gray to define content sections.
*   **Cards & Blocks:** `surface-container-lowest` (#FDFAF5) - A warm white that stands out softly against the off-white background.
*   **Active States & Highlights:** `surface-container-high` (#DCE9FF)

### The Primary Accents
*   **Primary/Navy:** `#1B3A6B` (Used for header, navbar, primary headings to provide stability and gravity).
*   **Secondary/Teal:** `#2E7D9C` (Used for buttons, positive actions, and links to guide user interactions).
*   **Tertiary/Amber:** `#F59E0B` (Used for warnings, pending states, and support/donation buttons).
*   **Alert/Red:** `#C0392B` (Used for urgent reports, critical errors, and SOS triggers).
*   **Success/Green:** `#27AE60` (Used for resolved status indicators and verification confirmations).

---

## 3. Typography: Solemnity and Readability
We use a high-contrast pairing of a traditional serif and a modern sans-serif.

*   **Display & Headlines (Merriweather):** Chosen for its editorial gravity, elegance, and warmth. Merriweather feels human and historical, giving a sense of respect to the content.
*   **Body & Labels (Inter / Poppins):** Modern, highly legible sans-serifs for interface elements, dense forms, status trackers, and quick navigation.
*   **Alignment:** Standard left-alignment is maintained for readibility.

---

## 4. Shapes & Roundness
To emphasize approachability and care, we reject sharp, hostile corners.
*   **Standard Roundness:** `ROUND_EIGHT` or `lg` (0.5rem / 8px) for buttons, inputs, and cards.
*   **Pill Roundness:** `full` (9999px) for badges, status chips, and toggle controls to keep them distinct.

---

## 5. Components: Humane Primitives

### Buttons
*   **Primary Action (Teal):** Solid teal `#2E7D9C` with white text.
*   **Urgent Action (Red):** Solid red `#C0392B` with white text.
*   **Secondary Action:** Transparent with a outline/border, or warm-white background with teal text.

### Cards
*   Cards use `#FDFAF5` with no harsh shadows. Instead, they use a soft ambient glow (opacity 5%, blur 12px) and a subtle `#E0D5C5` border to blend with the background.

### Input Fields
*   Warm-white background with a thin `#E0D5C5` border. On focus, transition to a teal outline with a soft glow.
