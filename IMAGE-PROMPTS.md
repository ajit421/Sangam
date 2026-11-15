# AI image prompts for the Sangam Hardware website

Paste each prompt into Nano Banana (Gemini) or any image tool. Save the result with the **exact file name** shown, put it in the **folder** shown, then rebuild. The site picks it up automatically.

**Rules for every image**
- Ask for **no text, no letters and no brand logos** in the image. AI tools garble Hindi text and fake brand logos, and real logos can bring trademark trouble.
- Square (1:1) for category tiles, landscape (4:3) for the others.
- Don't make an AI photo of the owner or of real customers. A fake face on a real shop's website misleads people. Use a real phone photo of Dharmendra ji later.

---

## 1. Category tiles → `website/src/assets/categories/`
These 4 categories show an emoji right now and need images first.

**`tanks.jpg`**
> Photorealistic product photo of three white and black plastic water storage tanks of different sizes (500 L, 1000 L) standing on a clean concrete floor outside a small Indian hardware shop, bright natural daylight, soft shadows, warm tones, square 1:1, no text, no logos, no people.

**`sanitary.jpg`**
> Photorealistic product photo of a white ceramic wash basin with pedestal, a white western commode and a white Indian-style toilet pan arranged neatly on a shop floor display, clean, bright daylight, slight warm tone, square 1:1, no text, no logos, no people.

**`taps.jpg`**
> Photorealistic close-up of shiny chrome bathroom taps, a brass tap and a round chrome shower head arranged on a light wooden shelf, sharp focus, soft studio lighting, square 1:1, no text, no logos.

**`tiles.jpg`**
> Photorealistic photo of stacked floor and wall tiles in beige, grey and terracotta colours with a few tiles fanned out to show patterns, inside a small Indian hardware shop, bright daylight, square 1:1, no text, no logos, no people.

Optional replacements (real Maps photos are used now):

**`pipes.jpg`**
> Photorealistic photo of neatly stacked white PVC and cream CPVC pipes with a pile of pipe fittings (elbows, tees, sockets) in front, on a concrete floor, bright daylight, square 1:1, no text, no logos.

**`pumps.jpg`**
> Photorealistic photo of a green cast-iron Indian hand pump (India Mark II chapakal) next to a small blue self-priming electric water motor, rural Bihar courtyard background softly blurred, morning sunlight, square 1:1, no text, no logos, no people.

**`paints.jpg`**
> Photorealistic photo of colourful paint buckets and tins (red, yellow, blue, pink, white) stacked in a pyramid with a paint roller and brush in front, bright and cheerful, square 1:1, no text, no logos.

---

## 2. Hero background (optional) → `website/src/assets/photos/hero-ai.jpg`
> Wide photorealistic photo of a newly built small brick house in a Bihar village being finished: fresh paint on the walls, a white water tank on the roof, a green hand pump in the courtyard, golden evening sunlight, hopeful and warm mood, 4:3, no text, no logos, people only far away and small.

---

## 3. Logo
The site already uses a logo I drew (`website/public/logo.svg`): a house with two streams meeting like a pipe joint ("Sangam" means confluence), in the board's red, yellow and blue. For a fancier version:

> Minimal flat vector logo icon for a hardware and paint store named "Sangam". A simple house outline in white, inside it two curved streams, one yellow and one blue, merging into one like a pipe T-joint (a confluence). Deep red (#B91C1C) rounded-square background. Bold, simple shapes that stay clear at 32 px. No text, no letters, flat design, centred, 1:1.

Keep the shop name as real text next to the icon. Don't let the AI write "संगम"; it will misspell it. If you pick an AI logo, export it as a square PNG (512×512) and send it to me to swap in.

---

## 4. Still needed as real photos (from the client's phone, in daylight)
- Dharmendra ji at the counter (About section)
- Front of the shop in morning light (hero image)
- The delivery vehicle, if there is one
- The UPI QR code (to show on the site)
