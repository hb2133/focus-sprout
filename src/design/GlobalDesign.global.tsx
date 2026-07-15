const GlobalDesignCss = `
    :root {
        --color-cream-100: #f7f4ea;
        --color-sand-300: #e5dfcf;
        --color-sand-400: #d4cdbd;
        --color-forest-500: #62776b;
        --color-forest-700: #285d45;
        --color-forest-800: #1f4d38;
        --color-forest-900: #17382a;
        --color-lime-200: #e4f0d5;
        --color-lime-300: #cbe3a8;
        --color-lime-600: #63994c;
        --color-amber-500: #c89342;
        --color-danger-100: #f7e2dc;
        --color-danger-600: #a9503e;
        --font-display: Inter, ui-rounded, "SF Pro Rounded", system-ui, sans-serif;
        --shadow-soft: 0 8px 24px rgba(35, 69, 48, 0.08);
        --ease-spring: cubic-bezier(0.2, 0.9, 0.25, 1.2);
        color: var(--color-forest-900);
        background: var(--color-cream-100);
        font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        font-synthesis: none;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
    }

    button, input {
        font-family: inherit;
    }

    button:focus-visible, input:focus-visible {
        outline: 3px solid rgba(99, 153, 76, 0.32);
        outline-offset: 2px;
    }
`;

export function GlobalDesign()
{
    return <style>{GlobalDesignCss}</style>;
}
