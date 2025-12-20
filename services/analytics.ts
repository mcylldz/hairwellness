import { PixelService } from './pixel';

export const AnalyticsService = {
    logStep: async (stepIndex: number, stepName: string, answers: any) => {
        const webhookUrl = (import.meta as any).env.VITE_ANALYTICS_WEBHOOK_URL || (import.meta as any).env.VITE_N8N_WEBHOOK_URL;
        if (!webhookUrl) return;

        const pixelData = await PixelService.getPixelData();

        const payload = {
            type: 'funnel_step',
            stepIndex,
            stepName,
            answers,
            ...pixelData,
            timestamp: new Date().toISOString()
        };

        try {
            // Use text/plain bypass for analytics too
            await fetch(webhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'text/plain' },
                body: JSON.stringify(payload)
            });
            console.log(`[Analytics] Step ${stepIndex} (${stepName}) logged.`);
        } catch (e) {
            console.error("[Analytics] Failed to log step", e);
        }
    },

    logEvent: async (eventName: string, data?: any) => {
        const webhookUrl = (import.meta as any).env.VITE_ANALYTICS_WEBHOOK_URL || (import.meta as any).env.VITE_N8N_WEBHOOK_URL;
        if (!webhookUrl) return;

        const pixelData = await PixelService.getPixelData();

        try {
            await fetch(webhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'text/plain' },
                body: JSON.stringify({
                    type: 'event',
                    eventName,
                    data,
                    ...pixelData,
                    timestamp: new Date().toISOString()
                })
            });
        } catch (e) {
            console.error("[Analytics] Failed to log event", e);
        }
    }
};
