interface ImportMetaEnv {
    readonly VITE_GEMINI_API_KEY: string;
    readonly VITE_STRIPE_1_WEEK_LINK: string;
    readonly VITE_STRIPE_4_WEEK_LINK: string;
    readonly VITE_STRIPE_12_WEEK_LINK: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
