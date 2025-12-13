import { storyblokEditable } from "@storyblok/react";
import { LucideIcon, icons } from "lucide-react";
import * as LucideIcons from "lucide-react";

// Helper to resolve icon string to component
const getIcon = (iconName: string): LucideIcon | null => {
    if (!iconName) return null;
    const name = iconName.charAt(0).toUpperCase() + iconName.slice(1);
    return (LucideIcons as any)[name] || (LucideIcons as any)[iconName] || null;
};

export default function FeatureTabItem({ blok }: { blok: any }) {
    // This component is primarily designed to be nested within InteractiveFeatureShowcase,
    // where its data is read directly by the parent. However, if rendered standalone
    // (e.g. by Storyblok bridge or accidentally placed on page), this fallback UI ensures it doesn't crash.

    const Icon = getIcon(blok.tab_icon);

    return (
        <div {...storyblokEditable(blok)} className="p-6 border border-gray-100 rounded-xl bg-white shadow-sm max-w-sm">
            <div className="flex items-center gap-4 mb-4">
                {Icon && (
                    <div className="p-2 bg-deep-purple/5 rounded-lg text-deep-purple">
                        <Icon size={24} />
                    </div>
                )}
                <div>
                    <h3 className="font-bold text-gray-900">{blok.tab_title || "Feature Tab"}</h3>
                    <p className="text-sm text-gray-500">{blok.tab_description}</p>
                </div>
            </div>
            <div className="space-y-2">
                <h4 className="font-semibold text-deep-purple">{blok.headline}</h4>
                <p className="text-gray-600 text-sm">{blok.body}</p>
            </div>
        </div>
    );
}
