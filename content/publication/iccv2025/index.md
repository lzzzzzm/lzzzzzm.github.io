---
title: 'II-World: Intra-Inter Tokenization for Efficient Dynamic 4D Scene Forecasting'

# Authors
# If you created a profile for a user (e.g. the default `admin` user), write the username (folder name) here
# and it will be replaced with their full name and linked to their profile.
authors:
  - admin
  - Ping Wei*
  - Ruijie Zhang
  - Shuaijia Chen
  - Haoxuan Wang
  - Ziyang Ren

# Author notes (optional)
author_notes:
  - 'Equal contribution'
  - 'Equal contribution'

date: '2025-06-01T00:00:00Z'
doi: ''

# Schedule page publish date (NOT publication's date).
publishDate: '2025-06-01T00:00:00Z'

# Publication type.
# Accepts a single type but formatted as a YAML list (for Hugo requirements).
# Enter a publication type from the CSL standard.
publication_types: ['paper-conference']

# Publication name and optional abbreviated publication name.
publication: In *International Conference on Computer Vision (ICCV) 2025*
publication_short: In *ICCV 2025*

abstract: Forecasting the evolution of 3D scenes and generating unseen scenarios through occupancy-based world models offers substantial potential to enhance the safety of autonomous driving systems. While tokenization has revolutionized image and video generation, efficiently tokenizing complex 3D scenes remains a critical challenge for 3D world models. To address this, we propose $I^{2}$-World, an efficient framework for 4D occupancy forecasting. Our method decouples scene tokenization into intra-scene and inter-scene tokenizers. The intra-scene tokenizer employs a multi-scale residual quantization strategy to hierarchically compress 3D scenes while preserving spatial details. The inter-scene tokenizer residually aggregates temporal dependencies across timesteps. This dual design preserves the compactness of 3D tokenizers while retaining the dynamic expressiveness of 4D tokenizers. Unlike decoder-only GPT-style autoregressive models, $I^{2}$-World adopts an encoder-decoder architecture. The encoder aggregates spatial context from the current scene and predicts a transformation matrix to guide future scene generation. The decoder, conditioned on this matrix and historical tokens, ensures temporal consistency during generation. Experiments demonstrate that $I^{2}$-World achieves state-of-the-art performance, surpassing existing approaches by \textbf{41.8$\%$} in 4D occupancy forecasting with exceptional efficiency—requiring only \textbf{2.9 GB} of training memory and achieving real-time inference at \textbf{94.8 FPS}.

# Summary. An optional shortened abstract.
summary: We propose II-World which utilize an efficient intra-inter scene tokenization for occupancy-based scene tokenization.

tags:
  - Autonomous Driving

# Display this page in the Featured widget?
featured: true

# Custom links (uncomment lines below)
# links:
# - name: Custom Link
#   url: http://example.org

url_pdf: ''
url_code: 'https://github.com/lzzzzzm/STCOcc'
url_poster: ''

# Featured image
# To use, add an image named `featured.jpg/png` to your page's folder.
image:
  caption: 'ICCV2025 Poster'
  focal_point: ''
  preview_only: false

# Associated Projects (optional).
#   Associate this publication with one or more of your projects.
#   Simply enter your project's folder or file name without extension.
#   E.g. `internal-project` references `content/project/internal-project/index.md`.
#   Otherwise, set `projects: []`.
projects:
  - example

# Slides (optional).
#   Associate this publication with Markdown slides.
#   Simply enter your slide deck's filename without extension.
#   E.g. `slides: "example"` references `content/slides/example/index.md`.
#   Otherwise, set `slides: ""`.
slides: example
---

Our main contribution:

- We introduce an explicit state-based modeling approach designed to renovate the 3D features both spatially and temporally.
- We propose a sparse, occlusion-aware mechanism that provides more accurate geometric 3D features. Additionally, we propose a novel sparse-based method for modeling long-term dynamic information. This approach not only reduces computational costs but also ensures spatial consistency.
- Our method achieves a RayIoU of 41.7% on Occ3D and a RayIoU of 40.8% along with a mAVE of 0.44 for occupancy and scene flow prediction on OpenOcc, while also reducing the training memory usage to 8.7GB.

