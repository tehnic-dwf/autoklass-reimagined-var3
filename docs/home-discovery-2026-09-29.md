# Homepage discovery — 29 September 2026

Two distinct sections: body types and editorial selections by use case. Each card links to existing listing filters, with counts computed from matchingVehicles. Presets are examples, not assertions that these are the only suitable cars.

## Assets
Built-in image_gen mode, four original fictional unbranded renders. Manufacturer influences are mixed; these illustrations do not depict the exact stock returned by filters. Alpha preserved; optimized with Sharp to 600 × 400 WebP (100,066 bytes total).
- src/assets/discovery/suv.webp
- src/assets/discovery/sedan.webp
- src/assets/discovery/coupe.webp
- src/assets/discovery/compact.webp

## Final prompt set
Common prompt for every asset:
Create one production-ready website category illustration asset for Romanian premium multibrand auto retailer Autoklass. Photorealistic high-end 3D studio car render, [subject]. Completely fictional unbranded car, no logos, badges, text, plates or watermark. Perfect strict side profile facing LEFT, both wheels visible, wheels straight. Whole car visible, evenly centered. Soft silver metallic body, dark realistic glass, refined alloy wheels, consistent soft neutral studio lighting, subtle contact shadow. Genuine transparent background; no floor, scenery, framing, card, UI, lettering or extra objects. Wide landscape 3:2 canvas. Car occupies 86 percent width and about 48 percent height, centered vertically; ample clear space. These are coherent automotive category illustrations, not flat vector icons. Output local file suitable for use as a website asset.

Subjects:
[
  [
    "suv",
    "a contemporary premium midsize SUV, blends Mercedes GLC proportions, Audi Q5 roofline and XPENG clean surfacing, five doors, tall distinct SUV silhouette"
  ],
  [
    "sedan",
    "an elegant contemporary four-door executive sedan, blends Audi A6 clean shoulders and Mercedes C-Class balanced three-box proportions, long hood and separate trunk"
  ],
  [
    "coupe",
    "a contemporary premium two-door coupe, blends Mercedes CLE long-hood proportions and Audi A5 restrained details, low sloping roof, clearly two doors"
  ],
  [
    "compact",
    "a contemporary five-door compact hatchback, blends Volkswagen Golf upright short rear hatch proportions with Honda Civic crisp restrained details, shorter body and practical hatch silhouette"
  ]
]

## Verification
TypeScript and targeted ESLint passed. Browser verified at 320, 390 and 430 CSS pixels: no document overflow, all eight image placements loaded. Carousel next button scrolls. All eight destinations contain the intended filters. Counts: SUV 7, sedan 10, coupe 4, compact 2; city 2, family 4, diesel automatic 5, electric 2.

