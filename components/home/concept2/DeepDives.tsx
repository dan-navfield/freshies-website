import FeatureDeepDive from "./FeatureDeepDive";

export default function DeepDives() {
    return (
        <div className="bg-white">
            {/* 1. Scanning */}
            <FeatureDeepDive
                label="Scan and check"
                headline="Scan products and understand what’s safe."
                body="Use your phone’s camera to scan skincare products at home or in store. Freshies breaks down long ingredient lists, highlights potential concerns, and shows a clear 0–100 safety score to help guide decisions."
                bullets={[
                    "Scan barcodes or product labels",
                    "Clear safety score out of 100",
                    "Simple colour cues to highlight risk",
                    "Ingredient explanations in plain language"
                ]}
                supportingLine="No guessing in the chemist aisle. No decoding tiny labels at home."
                imageSrc="/images/home-hero2.png" // Placeholder
                imageAlt="Scanning a product"
                isReversed={false}
            />

            {/* 2. Routines */}
            <FeatureDeepDive
                label="Daily habits"
                headline="Build healthy skincare routines that stick."
                body="Freshies helps families turn safe products into simple daily routines. Designed for school mornings, sport, sleepovers and busy family life, routines are short, achievable and age-appropriate."
                bullets={[
                    "Morning and night routines",
                    "Steps linked to products on your shelf",
                    "Visual progress kids can follow",
                    "Encourages consistency, not perfection"
                ]}
                microCopy="Tick it off, keep your streak going, and you’re done."
                imageSrc="/images/routine-list.png"
                imageAlt="Routine checklist"
                isReversed={true}
            />

            {/* 3. Learning */}
            <FeatureDeepDive
                label="Learn"
                headline="Learn what ingredients really mean."
                body="Freshies Learn helps parents and kids understand skincare without the jargon. From ingredient basics to common questions and trends, content is written in clear, friendly language for families to explore together."
                bullets={[
                    "Ingredient explainers",
                    "Product guidance by age and need",
                    "Healthy skincare habit guides",
                    "Calm explanations of trends kids are seeing online"
                ]}
                supportingLine="No fear. No judgement. Just the facts you need."
                imageSrc="/images/welcome-ruby.png"
                imageAlt="Education screen"
                isReversed={false}
            />

            {/* 4. Your Shelf */}
            <FeatureDeepDive
                label="Your shelf"
                headline="Keep track of what your family uses."
                body="Your shelf is a simple way to see all the skincare products in your home, linked to the kids who use them. It helps families stay organised, avoid confusion, and make better choices over time."
                bullets={[
                    "One place for all products at home",
                    "Products linked to each child",
                    "Easy to add items to routines",
                    "Helps avoid duplicates and unused products"
                ]}
                microCopy="Your skincare setup, all in one place."
                imageSrc="/images/routine-detail.png"
                imageAlt="Digital bathroom shelf"
                isReversed={true}
            />
        </div>
    );
}
