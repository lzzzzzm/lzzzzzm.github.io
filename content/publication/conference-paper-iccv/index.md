---
title: "II-World: Intra-Inter Tokenization for Efficient Dynamic 4D Scene Forecasting"
authors:
- admin
- Ping Wei*
- Ruijie Zhang
- Shuaijia Chen
- Haoxuan Wang
- Ziyang Ren
author_notes:
- "Equal contribution"
- "Equal contribution"
date: "2025-06-01T00:00:00Z"
doi: ""

# Schedule page publish date (NOT publication's date).
publishDate: "2025-06-01T00:00:00Z"

# Publication type.
# Accepts a single type but formatted as a YAML list (for Hugo requirements).
# Enter a publication type from the CSL standard.
publication_types: ["paper-conference"]

# Publication name and optional abbreviated publication name.
publication: "International Conference on Computer Vision (ICCV) 2025"
publication_short: "ICCV 2025"

abstract: Forecasting the evolution of 3D scenes and generating unseen scenarios through occupancy-based world models offers substantial potential to enhance the safety of autonomous driving systems. While tokenization has revolutionized image and video generation, efficiently tokenizing complex 3D scenes remains a critical challenge for 3D world models. To address this, we propose $I^{2}$-World, an efficient framework for 4D occupancy forecasting. Our method decouples scene tokenization into intra-scene and inter-scene tokenizers. The intra-scene tokenizer employs a multi-scale residual quantization strategy to hierarchically compress 3D scenes while preserving spatial details. The inter-scene tokenizer residually aggregates temporal dependencies across timesteps. This dual design preserves the compactness of 3D tokenizers while retaining the dynamic expressiveness of 4D tokenizers. Unlike decoder-only GPT-style autoregressive models, $I^{2}$-World adopts an encoder-decoder architecture. The encoder aggregates spatial context from the current scene and predicts a transformation matrix to guide future scene generation. The decoder, conditioned on this matrix and historical tokens, ensures temporal consistency during generation. Experiments demonstrate that II-World achieves state-of-the-art performance, surpassing existing approaches by 41.8% in 4D occupancy forecasting with exceptional efficiency—requiring only 2.9 GB of training memory and achieving real-time inference at 94.8 FPS.

# Summary. An optional shortened abstract.
summary: We propose an effcient intra-inter scene tokenization for occupancy-based 4D scene tokenization.

tags:
- Autonomous Driving
featured: true

# links:
# - name: ""
#   url: ""
url_pdf: ''
url_code: ''
url_poster: ''

# Featured image
# To use, add an image named `featured.jpg/png` to your page's folder. 
image:
  caption: 'Image credit: [**Unsplash**](https://unsplash.com/photos/jdD8gXaTZsc)'
  focal_point: ""
  preview_only: true

# Associated Projects (optional).
#   Associate this publication with one or more of your projects.
#   Simply enter your project's folder or file name without extension.
#   E.g. `internal-project` references `content/project/internal-project/index.md`.
#   Otherwise, set `projects: []`.
projects: []

# Slides (optional).
#   Associate this publication with Markdown slides.
#   Simply enter your slide deck's filename without extension.
#   E.g. `slides: "example"` references `content/slides/example/index.md`.
#   Otherwise, set `slides: ""`.
slides: example
---

{{% callout note %}}
Click the *Cite* button above to demo the feature to enable visitors to import publication metadata into their reference management software.
{{% /callout %}}

{{% callout note %}}
Create your slides in Markdown - click the *Slides* button to check out the example.
{{% /callout %}}

Add the publication's **full text** or **supplementary notes** here. You can use rich formatting such as including [code, math, and images](https://docs.hugoblox.com/content/writing-markdown-latex/).
