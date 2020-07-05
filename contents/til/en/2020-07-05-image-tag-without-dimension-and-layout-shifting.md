---
title: Image tag without dimension and layout shifting
slug: image-tag-without-dimension-and-layout-shifting
published_date: 2020-07-05
language: en
type: til
translations:
  id: /til/id/#tag-image-tanpa-dimensi-dan-layout-shifting
---

I just realize that a image tag without dimension attributes (`width` and `height`) can actually cause a significant layout shifting after I watched [this video by Addy Osmani](https://www.youtube.com/watch?list=PLNYkxOF6rcIDC0-BiwSL52yQ0n9rNozaF&v=AQqFZ5t8uNc&feature=emb_logo). And right now, cumulative layout shifts is a part of the Core Web Vitals which is taken into account for our page search ranking on Google. I think I should be more careful now when I want to add images in a responsive layout.
