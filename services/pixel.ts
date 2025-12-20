export const PIXEL_ID = '1654660432579354';

declare global {
    interface Window {
        fbq: any;
    }
}

export const getCookie = (name: string): string | null => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    return null;
};

export const PixelService = {
    track: (event: string, data?: any) => {
        if (window.fbq) {
            window.fbq('track', event, data);
            console.log(`[Pixel] Tracked: ${event}`, data);
        }
    },

    trackCustom: (event: string, data?: any) => {
        if (window.fbq) {
            window.fbq('trackCustom', event, data);
            console.log(`[Pixel] Tracked Custom: ${event}`, data);
        }
    },

    getPixelData: async () => {
        let ip = 'unknown';
        try {
            const res = await fetch('https://api.ipify.org?format=json');
            const json = await res.json();
            ip = json.ip;
        } catch (e) {
            console.warn("Could not fetch IP for Pixel", e);
        }

        return {
            fbp: getCookie('_fbp'),
            fbc: getCookie('_fbc'),
            userAgent: navigator.userAgent,
            ipAddress: ip
        };
    }
};
