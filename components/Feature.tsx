import { storyblokEditable } from "@storyblok/react";
import { Card } from "@/components/ui/Card";
import * as Icons from "lucide-react";

const Feature = ({ blok }: { blok: any }) => {
    // Dynamic icon loading
    const IconComponent = (Icons as any)[blok.icon] || Icons.Star;

    return (
        <Card {...storyblokEditable(blok)} className="p-6 h-full hover:shadow-lg transition-shadow bg-white/50 backdrop-blur-sm border-white/50">
            <div className="w-12 h-12 bg-ultraviolet/10 rounded-xl flex items-center justify-center mb-6 text-ultraviolet">
                <IconComponent className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-deep-purple">{blok.name}</h3>
            <p className="text-deep-purple/70 leading-relaxed">
                {blok.description}
            </p>
        </Card>
    );
};

export default Feature;
